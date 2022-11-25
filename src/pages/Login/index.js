import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  Switch,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton } from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { storeData, getData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log('Email is Not Correct');
      setData({ ...data, email: text });
      setValid(false);
      return false;
    } else {
      setData({ ...data, email: text });
      setValid(true);
      // console.log('Email is Correct');
    }
  };
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {
    if (data.email.length === 0 && data.password.length === 0) {
      showMessage({
        message: 'Maaf Email dan Password masih kosong !',
      });
    } else if (data.email.length === 0) {
      showMessage({
        message: 'Maaf Email masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      setTimeout(() => {
        axios
          .post('https://zavalabs.com/stokku/api/login.php', data)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {
              showMessage({
                type: 'danger',
                message: res.data.msg,
              });
            } else {
              storeData('user', res.data);
              axios
                .post('https://zavalabs.com/stokku/api/update_token.php', {
                  id_member: res.data.id,
                  token: token,
                })
                .then(res => {
                  console.log('update token', res);
                });
              navigation.replace('MainApp');
            }
          });
      }, 1200);
    }
  };
  return (
    <ImageBackground
      style={{
        backgroundColor: isEnabled ? colors.black : colors.white,
        flex: 1,
        padding: 10,
      }}>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: 200,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              resizeMode: 'contain',
              aspectRatio: 0.2,
            }}
          />
        </View>
        <View style={styles.page}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
              color: isEnabled ? colors.white : colors.black,
              // maxWidth: 230,
            }}>
            Silahkan login untuk masuk ke aplikasi{' '}
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: isEnabled ? colors.white : colors.black,
                // maxWidth: 230,
              }}>
              STOK-KU
            </Text>
          </Text>

          <MyGap jarak={20} />
          <MyInput
            label="Email"
            iconname="mail"
            textColor={isEnabled ? colors.white : colors.black}
            labelColor={isEnabled ? colors.white : colors.primary}
            colorIcon={isEnabled ? colors.white : colors.primary}
            borderColor={isEnabled ? colors.white : colors.primary}
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />
          {!valid && (
            <Text
              style={{
                color: colors.danger,
                fontFamily: fonts.primary[600],
                textAlign: 'right',
                right: 10,
              }}>
              Maaf Email Anda Tidak Valid !
            </Text>
          )}
          <MyGap jarak={20} />
          <MyInput
            textColor={isEnabled ? colors.white : colors.black}
            labelColor={isEnabled ? colors.white : colors.primary}
            colorIcon={isEnabled ? colors.white : colors.primary}
            borderColor={isEnabled ? colors.white : colors.primary}
            label="Password"
            iconname="key"
            secureTextEntry
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />
          <MyGap jarak={40} />
          {valid && (
            <MyButton
              warna={colors.primary}
              title="LOGIN"
              Icons="log-in"
              onPress={masuk}
            />
          )}

          <TouchableOpacity onPress={() => Linking.openURL('https://zavalabs.com/stokku/login/forgot')} style={{
            justifyContent: 'flex-end',
            padding: 10,
            alignItems: 'flex-end'
          }}>
            <Text style={{
              color: colors.black,
              fontFamily: fonts.secondary[600],
              fontSize: 20,
              borderBottomWidth: 1,
              borderBottomColor: colors.danger
            }}>Lupa Password ?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{ backgroundColor: colors.primary }}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
