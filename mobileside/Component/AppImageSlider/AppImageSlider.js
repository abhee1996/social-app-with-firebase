import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Slick from 'react-native-slick';
import colors from '../../config/colors';
const {width, height} = Dimensions.get('window');
const AppImageSlider = ({images}) => {
  return (
    <View style={styles.imageContainer}>
      <Slick
        showsButtons={true}
        autoplay={true}
        horizontal={true}
        bounces={true}
        // showsHorizontalScrollIndicator={true}
        automaticallyAdjustContentInsets={true}
        scrollEnabled={true}
        showsPagination={true}
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
        activeDot={<View style={styles.activeDotStyle} />}
        dot={<View style={styles.dotStyle} />}
        buttonWrapperStyle={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
          left: 0,
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {images ? (
          images?.map(image => (
            <>
              {console.log('image', image?.product_images)}
              <Image
                key={image}
                style={styles.image}
                source={{uri: image?.product_images}}
              />
            </>
          ))
        ) : (
          <></>
        )}
      </Slick>
    </View>
  );
};

export default AppImageSlider;

const styles = StyleSheet.create({
  imageContainer: {
    // backgroundColor: 'white',
    // margin: 0,
    // padding: 0,
    // borderWidth: 2,
    height: height / 2.2,
  },
  image: {
    width: width - 10, //'100%',
    height: 270,
  },
  buttonText: {
    bottom: 250,
    fontWeight: '900',
    fontSize: 60,
    color: colors.indigopro.indigo700,
  },
  dotStyle: {
    // bottom: 400,
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDotStyle: {
    // bottom: 400,
    backgroundColor: colors.indigopro.indigo700,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
