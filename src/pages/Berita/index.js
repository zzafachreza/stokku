import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Linking,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import {MyButton, MyGap} from '../../components';
import {colors} from '../../utils/colors';
import {ScrollView} from 'react-native-gesture-handler';

export default function Berita({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const item = route.params;
  console.log('berita', item);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}>
      <ScrollView style={{flex: 1}}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 18,
          }}>
          {item.judul}
        </Text>
        <Image
          source={{uri: item.image}}
          style={{aspectRatio: 1}}
          resizeMode="contain"
        />
        <HTML source={{html: item.render}} />
      </ScrollView>
      <View>
        <MyButton
          onPress={() => {
            Linking.openURL(
              'https://api.whatsapp.com/send?text=Hallo%20Pembantuku%20saya%20mau%20order&phone=6282111801168',
            );
          }}
          warna="#4FCE5D"
          Icons="logo-whatsapp"
          title="ORDER VIA WHATSAPP 1"
        />
        <MyGap jarak={10} />
        <MyButton
          onPress={() => {
            Linking.openURL(
              'https://api.whatsapp.com/send?text=Hallo%20Pembantuku%20saya%20mau%20order&phone=6281279776606',
            );
          }}
          warna="#4FCE5D"
          Icons="logo-whatsapp"
          title="ORDER VIA WHATSAPP 2"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
