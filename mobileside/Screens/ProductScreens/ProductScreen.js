import React, {useEffect, useCallback, useState, useContext} from 'react';
import {View, TextInput} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ProductList from '../../Component/Products/ProductList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Heading,
  Icon,
  Box,
  Input,
  Text,
  TextField,
  Center,
} from 'native-base';
import SearchProduct from '../../Component/Products/SearchProduct';
import Banner from '../../Component/Banner/Banner';
import {category} from '../../assets/data.json';
import config from '../../config/config';
import axios from 'axios';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import {
  getAllProduct,
  getfilterShopProduct,
} from '../../Redux/actions/Product.actions';

const ProductScreen = props => {
  const [product, setProduct] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [focus, setfocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [active, setActive] = useState(-1);
  const [initialState, setInitialState] = useState();
  const context = useContext(AuthGlobal);
  const shopValue = context?.shopValue;
  const userValue = context?.userValue;
  const ShopId = shopValue?.shopId;
  const shopuuid = shopValue?.shop_uuid;
  const UserId = userValue?.userId;
  const getAllProductURL = `${config.server}/product/getall/`;
  var filterShopProductURL = `${config.server}/product/getallProductBy/shopuuid/${shopuuid}`;

  //masq01
  const getdata = async () => {
    try {
      if (shopuuid) {
        getfilterShopProduct(filterShopProductURL).then(res => {
          setProduct(res.data);
          setProductImage(res.data);
          setProductFilter(res.data);
          setInitialState(res.data);
        });
      } else {
        getAllProduct(getAllProductURL).then(res => {
          setProduct(res.data);
          setProductImage(res.data);
          setProductFilter(res.data);
          setInitialState(res.data);
        });
        const res = await axios.get(`${getAllProductURL}`);
        setProduct(res.data);
        setProductImage(res.data);
        setProductFilter(res.data);
        setInitialState(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  const getCategories = async () => {
    const getAllCategoryURL = `${config.server}/category/allcategories`;

    try {
      const res = await axios.get(`${getAllCategoryURL}`);
      setCategories(res.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCategories();
      getdata();
    }, []),
  );

  return (
    <>
      <Container>
        <Box width="400" height="70">
          <Center
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingVertical: 35,
              paddingHorizontal: 15,
              height: 25,
            }}>
            {/* <Input
              w={{
                base: '95%',
                md: '45%',
              }}
              style={{
                backgroundColor: 'gainsboro',
              }}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="search" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              InputRightElement={
                <Icon
                  onPress={() => setfocus(false)}
                  as={<FontAwesome name="close" />}
                  size={5}
                  mr="2"
                />
              }
              variant="rounded"
              width="330"
              placeholder="search"
              onFocus={() => setfocus(true)}
              onChangeText={text => {
                setProductFilter(
                  product.filter(i =>
                    i.name.toLowerCase().includes(text.toLowerCase()),
                  ),
                );
              }}
            /> */}
          </Center>
        </Box>
        {focus == true ? (
          <>
            {/* <SearchProduct
              navigation={props.navigation}
              productFilter={productFilter}
            /> */}
          </>
        ) : (
          <>
            <View>
              <ProductList
                navigation={props.navigation}
                item={product}
                productImage={productImage}
                categories={categories}
                setCategories={setCategories}
              />
            </View>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;

// const productarr = [
//   {
//     id: 3,
//     name: 'TH 1050 lenovo laptops',
//     sku: 'New TH1050 lenovo laptos',
//     description: 'lenovo laptops are good',
//     price: 300,
//     countOnStock: 400,
//     img: 'https://image.shutterstock.com/shutterstock/photos/1920310286/display_1500/stock-photo-laptop-isolated-on-white-background-with-clipping-paths-for-laptop-and-screen-1920310286.jpg',
//     createdAt: '2022-06-20T15:31:11.000Z',
//     updatedAt: '2022-06-20T15:31:11.000Z',
//     CategoryId: 1,
//     ShopId: 1,
//   },
//   {
//     id: 4,
//     name: 'TH 1050 HP Laptops',
//     sku: 'New TH1050  HP Laptops ',
//     description: ' HP Laptops  are good',
//     price: 300,
//     countOnStock: 400,
//     img: 'https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_960_720.jpg',

//     createdAt: '2022-06-20T15:32:18.000Z',
//     updatedAt: '2022-06-20T15:32:18.000Z',
//     CategoryId: 1,
//     ShopId: 1,
//   },
//   {
//     id: 5,
//     name: 'TH 1050 HP OPPO Mobile',
//     sku: 'New OPPO Mobile ',
//     description: ' OPPO Mobile  are good',
//     price: 100,
//     countOnStock: 50,
//     img: 'https://image.shutterstock.com/shutterstock/photos/1920310286/display_1500/stock-photo-laptop-isolated-on-white-background-with-clipping-paths-for-laptop-and-screen-1920310286.jpg',
//     createdAt: '2022-06-20T15:32:18.000Z',
//     updatedAt: '2022-06-20T15:32:18.000Z',
//     CategoryId: 2,
//     ShopId: 1,
//   },
//   {
//     id: 6,
//     name: 'Galexy Samsung',
//     sku: 'New Galexy Samsung Mobile ',
//     description: ' Galexy Samsung Mobile  are good',
//     price: 100,
//     countOnStock: 100,
//     img: 'https://image.shutterstock.com/shutterstock/photos/1920310286/display_1500/stock-photo-laptop-isolated-on-white-background-with-clipping-paths-for-laptop-and-screen-1920310286.jpg',
//     createdAt: '2022-06-20T15:32:18.000Z',
//     updatedAt: '2022-06-20T15:32:18.000Z',
//     CategoryId: 2,
//     ShopId: 1,
//   },
//   {
//     id: 7,
//     name: 'i7 Apple Mobile',
//     sku: 'New i7 Apple Mobile ',
//     description: ' i7 Apple Mobile  are good',
//     price: 900,
//     countOnStock: 200,
//     img: 'https://image.shutterstock.com/shutterstock/photos/1920310286/display_1500/stock-photo-laptop-isolated-on-white-background-with-clipping-paths-for-laptop-and-screen-1920310286.jpg',
//     createdAt: '2022-06-20T15:32:18.000Z',
//     updatedAt: '2022-06-20T15:32:18.000Z',
//     CategoryId: 2,
//     ShopId: 1,
//   },
// ];
