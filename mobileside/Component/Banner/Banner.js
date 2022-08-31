import {
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import Slick from 'react-native-slick';
const {width} = Dimensions.get('window');
const data = [
  `https://cdn.pixabay.com/photo/2017/11/29/13/28/a-discount-2986181_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2020/12/17/13/34/discount-5839311_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2020/12/17/13/34/discount-5839311_960_720.jpg`,
  `https://via.placeholder.com/150/92c952`,
  `https://via.placeholder.com/150/771796`,
];
const Banner = () => {
  const [bannerData, setBannerData] = useState(data);

  useEffect(() => {
    setBannerData(data);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Slick
          buttonWrapperStyle={styles.swiper}
          dotColor={'grey'}
          dotStyle={styles.dotStyles}
          containerStyle={styles.swiper}
          activeDotStyle={styles.dotStyles}
          showsButtons={true}>
          {bannerData.map((img, i) => {
            return (
              <>
                <Image
                  key={i}
                  style={[styles.imageBanner]}
                  source={{
                    uri: img,
                  }}
                  resizeMode="contain"
                />
              </>
            );
          })}
        </Slick>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
    marginTop: 10,
  },
  swiper: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: width / 2,
    paddingTop: 10,
    width: width / 1.04,
  },
  dotStyles: {
    marginTop: 40,
    top: 25,
  },
  imageBanner: {
    borderWidth: 1,
    height: width / 2.5,
    width: '95%',
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    top: 10,
  },
});
export default Banner;
