import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function MyCarouser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    // axios.get('https://zavalabs.com/pembantuku/api/slider.php').then(res => {
    //   setData(res.data);
    // });
  }, []);

  const [data, setData] = useState([
    {
      id: 1,
      image:
        'https://www.bundahomecare.com/wp-content/uploads/2021/01/Homevare-terbaik-slide-1.png',
      judul: 'Penyedia jasa layanan Homecare',
    },
    {
      id: 2,
      image:
        'https://www.bundahomecare.com/wp-content/uploads/2021/01/Homevare-terbaik-slide-2.png',
      judul: 'Penyedia jasa layanan Homecare',
    },
  ]);

  const _renderItem = ({item, index}) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Berita', item);
        }}>
        <ImageBackground
          key={item.id}
          source={{uri: item.image}}
          style={{
            height: Math.round((windowWidth * 9) / 16),
          }}>
          {/* <View
            style={{
              backgroundColor: colors.primary,
              position: 'absolute',
              // maxWidth: 200,
              bottom: 0,
              right: 0,
              borderTopLeftRadius: 20,
              // borderBottomRightRadius: 20,
              opacity: 0.9,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Courgette-Regular',
                color: colors.white,
              }}>
              {item.judul}
            </Text>
          </View> */}
        </ImageBackground>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors.secondary,
      }}>
      <Carousel
        // layout="stack"
        layoutCardOffset={18}
        data={data}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        renderItem={_renderItem}
        activeDotIndex
        autoplay={true}
        autoplayDelay={2000}
        autoplayInterval={3000}
        onSnapToItem={index => setActiveSlide(index)}
        activeAnimationType="spring"
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
