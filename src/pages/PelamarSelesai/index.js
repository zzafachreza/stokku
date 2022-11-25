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
import axios from 'axios';

export default function PelamarSelesai({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const txt = new Animated.Value(-windowWidth);

  console.log('kirim', route.params);

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
          loop={false}
        />
        <Animated.Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: 20,
            color: 'black',
            bottom: txt,
          }}>
          Lamaran Anda Berhasil
        </Animated.Text>
      </View>
      <View
        style={{
          //   flex: 1,
          padding: 10,
        }}>
        <MyButton
          title="KEMBALI"
          warna={colors.primary}
          onPress={() => navigation.replace('Splash')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
