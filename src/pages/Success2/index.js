import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';

export default function Success2({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const txt = new Animated.Value(-windowWidth);

  setTimeout(() => {
    navigation.replace('MainApp');
  }, 1000);

  Animated.timing(txt, {
    toValue: 10,
    duration: 800,
    useNativeDriver: false,
  }).start();

  const messege = route.params.messege;
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 100,
        }}>
        <LottieView
          source={require('../../assets/success.json')}
          autoPlay
          autoPlay
          loop={false}
        />
        <Animated.Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: 20,
            color: 'black',
            bottom: txt,
          }}>
          {messege}
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
