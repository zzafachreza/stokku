import React, {useState, useEffect} from 'react';
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
import {MyButton, MyGap} from '../../components';
import {colors} from '../../utils/colors';
import {getData} from '../../utils/localStorage';
import axios from 'axios';

export default function PembantuSelesai({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const txt = new Animated.Value(-windowWidth);
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      console.log(res);
      const kirim = {
        id_member: res.id,
        nama_lengkap: item.nama_lengkap,
        sebagai_apa: item.sebagai_apa,
        id_pelamar: item.id,
      };

      axios
        .post('https://zavalabs.com/pembantuku/api/transaksi_add.php', kirim)
        .then(res => {
          console.log(res);
        });

      console.log('kirim data', kirim);
    });
  }, []);

  const item = route.params;
  console.log('detail pembantu', item);

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
          paddingBottom: 40,
        }}>
        <LottieView
          source={require('../../assets/success.json')}
          autoPlay
          loop={false}
        />
        <Text
          style={{
            // marginTop: 5,
            // marginBottom: 5,
            fontFamily: fonts.secondary[600],
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
          }}>
          Booking Confirmed
        </Text>
        <Animated.Text
          style={{
            marginTop: 10,
            fontFamily: fonts.secondary[400],
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
            // bottom: txt,
          }}>
          Permintaan Anda Sudah Terkirim, Selanjutnya kami proses dan segera
          hubungi Anda kembali. Terima kasih
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
          onPress={() => navigation.replace('MainApp')}
        />
        <MyGap jarak={10} />
        <MyButton
          title="TAMBAH"
          warna={colors.secondary}
          onPress={() => navigation.replace('MainApp')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
