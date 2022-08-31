import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useToast} from 'native-base';
import React, {useContext, useEffect, useRef, useState} from 'react';
import FormContainer from '../../Component/FormContainer';
import InputField from '../../Component/InputField';
import Error from '../../Component/Error';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import config from '../../config/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import colors from '../../config/colors';
import Screen from '../../Component/Screen';
import AppPicker from '../../Component/AppPicker/AppPicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNImagePicker from 'react-native-image-crop-picker';
// import * as RNImagePicker from 'react-native-image-picker';
import mime from 'mime';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppDrawer from '../../Component/AppDrawer/AppDrawer';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {getCategories} from '../../Redux/actions/categoryAction';
import {getProductImages} from '../../Redux/actions/Product.actions';
const {width, height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const AdminProductForm = props => {
  const [pickerValue, setPickerValue] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [brand, setBrand] = useState();
  const [sku, setSku] = useState();
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [isMultiImage, setIsMultiImage] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [fireImage, setfireImage] = useState();
  const [token, setToken] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState();
  const [error, setError] = useState();
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthGlobal);

  const shopValue = context?.shopValue;
  const shopValueData = shopValue?.shopArr;
  const toast = useToast();
  let imgRef = React.createRef();
  const refRBSheet = useRef();
  let configDotServer = config.server;
  let propsRouteParams = props?.route?.params;
  let propItems = propsRouteParams?.item;
  const cloudinaryURL = `https://res.cloudinary.com/v1_1/masqsoft/image/upload`;

  const saveAction = (res, item) => {
    try {
      if (res.status == 200) {
        toast.show({
          title: `${
            item !== undefined || null
              ? 'update Product Successfully'
              : 'New Product Added Successfully'
          }`,
          // title: 'New Product Added Successfully',
          placement: 'top-right',
          color: 'white',
          bgColor: 'green.300',
        });
        setTimeout(() => {
          props.navigation.navigate('AdminProducts');
        }, 500);
      }
    } catch (err) {
      console.warn('error in Product entry', err);
      toast.show({
        title: `${
          item !== undefined || null
            ? 'update Product failed'
            : 'New Product Added failed'
        }`,
        // title: `${'New Product Added failed'}`,
        placement: 'top-right',
      });
    }
  };
  let productImages = image;

  const ImagePicker = async () => {
    await RNImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
    }).then(img => {
      if (img) {
        if (isMultiImage === true) {
          if (Array.isArray(img)) {
            let x;
            let ImageData = [];
            for (let i = 0; i < img?.length; i++) {
              x = {image: img[i].path, isNew: true};
              ImageData.push(x);
            }

            setImage(ImageData);
          }
        } else {
          setMainImage(img[0].path);
          // let newImageURI;
          // img.forEach(newImg => {
          //   console.log('newImg', newImg);
          //   newImageURI = 'file:///' + newImg?.path?.split('file:/').join('');
          //   console.log('newImageURL', newImageURI);

          //   // if (newImg.isNew) {
          //   // }
          // });
          let newImageURI = 'file:///' + img[0]?.path?.split('file:/').join('');
          let file = newImageURI.split('/').pop();

          console.log('newImageURL', newImageURI);
          console.log('file', file);

          const uploadTask = storage()
            .ref()
            .child(`/items/${Date.now()}`)
            .putFile(img[0]?.path);
          console.log('uploadTask', uploadTask._storage);
          uploadTask.on(
            'state_changed',
            async snapshot => {
              const progress =
                (await (snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
              console.log('Upload is ' + progress + '% done');
              if (progress === 100) {
                alert('Upload is ' + progress + '% done');
              }
            },
            error => {
              console.log('error in fire storage', error);
            },
            async () => {
              console.log('uploadTask.snapshot.ref', uploadTask.snapshot.ref);
              await getDownloadURL(uploadTask.snapshot.ref).then(
                downloadURL => {
                  console.log('File available at', downloadURL);
                  setfireImage(downloadURL);
                },
              );
            },
          );
        }
      }
    });
  };

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
      setLoading(false);
    } else {
      setItem(propItems);
      setName(propItems?.name);
      setPrice(propItems?.price.toString());
      setSku(propItems?.sku);
      setDescription(propItems?.description);
      setMainImage(propItems?.image);
      setRichDescription(propItems?.richDescription);
      setBrand(propItems?.brand);
      setCountInStock(propItems?.countInStock.toString());
      setCategoryId(propItems?.categoryId);
      setNumReviews(propItems?.numReviews);
      setRating(propItems?.rating);
      setLoading(false);
    }
    let getproductImagesURL = `${configDotServer}/product/getproductImages/${propItems?.productUuid}`;
    getProductImages(getproductImagesURL)?.then(res => {
      setImage(res?.data);
    });
    getCategories(setCategories);
    AsyncStorage.getItem('user_login_Jwt_Token')
      .then(res => {
        setToken(res);
      })
      .catch(error => console.log('error', error));
  }, []);
  async function fireStoreCreateProduct() {
    if (
      name === '' ||
      price === '' ||
      brand === '' ||
      description === '' //||
      // mainImage === null ||
      // mainImage === '' ||
      // mainImage === undefined
    ) {
      setError('Please fill all fields to save product');
    } else {
      const fireProduct = {
        name,
        description,
        brand,
        price,
        mainImage: fireImage,
        uid: auth().currentUser.uid,
      };
      try {
        await firestore().collection('eshop').add(fireProduct);
      } catch (error) {
        console.log('error', error);
      }
    }
  }
  const saveProduct = async () => {
    if (
      (name === '' || price === '' || sku === '' || description === '',
      category === '' || image === null || image === '' || image === undefined)
    ) {
      setError('Please fill all fields to save product');
    } else {
      const formdataproduct = new FormData();
      productImages.forEach(newImg => {
        let newImageURI = 'file:///' + newImg?.image?.split('file:/').join('');
        if (newImg.isNew) {
          let file = newImageURI.split('/').pop();
          formdataproduct.append('images', {
            uri: newImageURI,
            type: mime.getType(newImageURI),
            name: file,
          });
        }
      });
      formdataproduct.append('name', name);
      formdataproduct.append('sku', sku);
      formdataproduct.append('brand', brand);
      formdataproduct.append('description', description);
      formdataproduct.append('Brand', richDescription);
      formdataproduct.append('price', price);
      formdataproduct.append('countInStock', countInStock);
      formdataproduct.append('rating', rating);
      formdataproduct.append('numReviews', numReviews);
      formdataproduct.append('isFeatured', isFeatured);
      formdataproduct.append('categoryId', categoryId);
      formdataproduct.append('shop_uuid', shopValueData?.shopUuid);

      const config = {
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      if (item == undefined || null) {
        console.log('new product--> item undefined|| null');
        firestore().collection('eshop').auth;
        // let newProductURL = `${configDotServer}/product/new/`;
        // const newResponse = await axios
        //   .post(newProductURL, formdataproduct, config)
        //   .then(res => {
        //     return res;
        //   });
        saveAction(newResponse);
      } else {
        let updateProductURL = `${configDotServer}/product/update/${item?.id}`;
        const updateResponse = await axios
          .put(updateProductURL, formdataproduct, config)
          .then(res => {
            return res;
          });
        saveAction(updateResponse, item);
      }
    }
  };

  const RenderInner = () => (
    <View //style={styles.panel}
    >
      <View style={{alignItems: 'center'}}>
        <Text //style={styles.panelTitle}
        >
          Upload Photos
        </Text>
      </View>
      {/* <TouchableOpacity
       style={[
        //styles.panelButton, 
        { backgroundColor: colors.secondary }
      ]}
      //onPressOut={takePhotoFromCamera}
      >
        <Text //style={styles.panelButtonTitle}
        >
          Take Photo
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[
          // styles.panelButton,
          {backgroundColor: colors.secondary},
        ]}
        onPressOut={() => {
          ImagePicker();
        }}>
        <Text //style={styles.panelButtonTitle}
        >
          Choose From Library
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          //styles.panelButton,
          {backgroundColor: colors.lightBlack},
        ]}
        onPressOut={() => refRBSheet.current.close()}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  const ImageViewer = () => {
    return (
      <>
        <View
          style={{
            height: height / 4,
            margin: 15,
          }}>
          <Text
            style={{
              color: '#84939e',
              marginTop: 10,
              marginLeft: 5,
              fontWeight: 'bold',
            }}>
            Image:
          </Text>
          {image ? (
            <ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              height={100}
              style={{marginTop: 10, marginLeft: 10}}
              contentInset={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 20,
              }}
              contentContainerStyle={{
                paddingRight: Platform.OS === 'android' ? 20 : 0,
              }}>
              <>
                {image?.map((img, i) => {
                  return (
                    <ImageBackground
                      style={[
                        styles.imageBackground,
                        {marginLeft: i !== 0 ? 15 : 0},
                      ]}
                      key={i}
                      source={{uri: img.image || img?.product_images}}>
                      <TouchableOpacity
                        onPress={() => {
                          setDeletedImages([...deletedImages, img]);
                          let temp = [...image];
                          temp.splice(i, 1);
                          if (temp.length === 0) {
                            setImage(null);
                          } else {
                            setImage(temp);
                          }
                        }}>
                        <AntDesign
                          name="delete"
                          size={25}
                          color={colors.dangerpro.danger400}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  );
                })}
              </>

              <TouchableOpacity
                style={[styles.addImgButton, {marginLeft: 15}]}
                onPress={() => {
                  refRBSheet.current.open();
                  setIsMultiImage(true);
                }}>
                <Ionicons name="add" size={60} color={colors.secondary.s600} />
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <View style={styles.addImgView}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                  setIsMultiImage(true);
                }}>
                <Ionicons name="add" size={60} color={colors.secondary.s400} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </>
    );
  };
  return (
    <>
      {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: colors.voiletpro.violet500,
              alignItems: 'center',
              height: 55,
              width: width,
            }}>
            <AppIconButton
              leftIcon={true}
              iconAs="MaterialIcons"
              name="arrow-back"
              width={-45}
              height={23}
              size={40}
              style={{
                right: item ? 68 : 90,
              }}
              buttonStyle={{
                alignSelf: 'center',
                justifyContent: 'center',
                top: 9,
              }}
              iconColor={colors.default.white}
              onPress={() => props.navigation.goBack()}
            />
            <Text
              style={{color: colors.default.white, right: 23, fontSize: 30}}>
              {item ? 'Update Product ' : 'Add Product'}
            </Text>
          </View>
          <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            enableOnAndroid={true}>
            <FormContainer
            //title={item ? 'Update Product ' : 'Add Product'}
            >
              <View style={styles.ImageContainer}>
                <Image style={styles.Image} source={{uri: mainImage}} />
                <TouchableOpacity
                  onPress={() => {
                    setIsMultiImage(false);
                    if (isMultiImage === false) {
                      ImagePicker();
                    }
                  }}
                  style={styles.ImagePicker}>
                  <FontAwesome name="camera" style={{color: 'white'}} />
                </TouchableOpacity>
              </View>
              <InputField
                placeholder="Brand"
                name="brand"
                id={'brand'}
                value={brand}
                islabel={true}
                label={'Brand'}
                labelStyle={styles.label}
                onChangeText={text => setBrand(text)}
              />
              <InputField
                placeholder="Name"
                name="name"
                id={'name'}
                value={name}
                islabel={true}
                label={'Name'}
                labelStyle={styles.label}
                onChangeText={text => setName(text)}
              />
              <InputField
                placeholder="Price"
                name="price"
                id={'price'}
                value={price}
                islabel={true}
                label={'Price'}
                labelStyle={styles.label}
                keyboardType={'numeric'}
                onChangeText={text => setPrice(text)}
              />
              {/* <InputField
                placeholder="Stock"
                name="stock"
                id={'stock'}
                value={countInStock}
                islabel={true}
                label={'Count in Stock'}
                keyboardType={'numeric'}
                labelStyle={styles.label}
                onChangeText={text => setCountInStock(text)}
              /> */}

              {/* <InputField
                placeholder="SKU"
                name="sku"
                id={'sku'}
                value={sku}
                islabel={true}
                label={'Sku'}
                labelStyle={styles.label}
                onChangeText={text => setSku(text)}
              /> */}
              <InputField
                placeholder="Description"
                name="description"
                id={'description'}
                value={description}
                islabel={true}
                label={'Description'}
                labelStyle={styles.label}
                onChangeText={text => setDescription(text)}
              />
              {/* <View style={{marginTop: 10}}>
                <AppPicker
                  selectedValue={pickerValue}
                  pickerStyle={styles.picker}
                  prickerItemStyle={styles.pickerItem}
                  onValueChange={item => {
                    console.log('cate item', item);
                    setPickerValue(item),
                      setCategory(item),
                      setCategoryId(item);
                  }}
                  dataArray={categories}
                  placeholder={'Select Category'}
                  pickerWidth={320}
                />
              </View> */}
              <View>{error ? <Error message={error} /> : null}</View>
              {/* <View>
                <ImageViewer />
              </View> */}
              <View style={styles.buttonContainer}>
                <AppIconButton
                  //disabled={fireImage ? false : true}
                  title="Save"
                  leftIcon={true}
                  size={15}
                  marginX="3.5%"
                  marginY="7%"
                  borderRadius={0}
                  buttonBgColor={colors.successpro.success500}
                  txtColor={colors.default.white}
                  // onPress={() => saveProduct()}
                  onPress={() => {
                    console.log('mainImage', mainImage);
                    console.log('fireImage', fireImage);
                    //fireStoreCreateProduct();
                  }}
                />
              </View>
            </FormContainer>
          </KeyboardAwareScrollView>
          {/* <AppDrawer refRBSheet={refRBSheet}>
            <RenderInner />
          </AppDrawer> */}
        </>
      )}
    </>
  );
};

export default AdminProductForm;

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  picker: {
    padding: 2,
    borderWidth: 0,
  },
  prickerItem: {
    padding: 2,
    fontSize: 20,
    fontWeight: 600,
    borderWidth: 0,
  },
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
  addImgButton: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#9c9c9c',
    borderWidth: 2,
    borderRadius: 5,
  },
  imageBackground: {
    height: 100,
    width: 100,
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  ImageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  ImagePicker: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});
