import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {color} from 'react-native-reanimated';
import {getData} from '../../utils/localStorage';
import {PermissionsAndroid} from 'react-native';

export default function Splash({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const unsubscribe = getData('user').then(res => {
      console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('GetStarted');
        }, 2000);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('MainApp');
        }, 2000);
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.image}
          source={require('../../assets/logo2.png')}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[800],
            fontSize: windowWidth / 6,
            color: colors.white,
          }}>
          STOK-KU
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.white,
          }}>
          Menghitung Stok Lebih Cepat
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 27,
            color: colors.primary,
            marginBottom: 10,
          }}>
          https://www.zavalabs.com/
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    aspectRatio: 1,
    height: 300,
  },
});
