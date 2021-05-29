import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';
import axios from 'axios';
import LottieView from 'lottie-react-native';

export default function PelamarDetail({navigation, route}) {
  const item = route.params;
  console.log('dataPelamar', item);
  const [loading, setLoading] = useState(false);

  const MyListData = ({label, value}) => {
    return (
      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          paddingBottom: 5,
          borderBottomColor: colors.primary,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.secondary,
            }}>
            {label}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: 12,
            color: colors.black,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
        }}>
        <Image
          resizeMode="cover"
          style={{
            width: '100%',
            aspectRatio: 1,
          }}
          source={{
            uri: item.foto2,
          }}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          padding: 20,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 20,
          }}>
          {item.nama_lengkap} ({' '}
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: 18,
              color: colors.primary,
            }}>
            {item.nama_panggilan}
          </Text>{' '}
          )
        </Text>
        <MyListData label="E - mail" value={item.email} />
        <MyListData label="Tempat Lahir" value={item.tempat_lahir} />
        <MyListData label="Tanggal Lahir" value={item.tanggal_lahir} />
        <MyListData label="Nomor KTP" value={item.nomor_ktp} />
        <MyListData label="Nomor KK" value={item.nomor_kk} />
        <MyListData label="Alamat" value={item.alamat} />
        <MyListData label="Alamat Sekaran" value={item.alamat_sekarang} />
        <MyListData label="Profesi" value={item.profesi} />
        <MyListData label="Telepon" value={item.telepon} />
        <MyListData label="Tinggi Badan" value={item.tinggi_badan} />
        <MyListData label="Berat Badan" value={item.berat_badan} />
        <MyListData label="Umur" value={item.umur} />
        <MyListData label="Mau kerja dimana ?" value={item.mau_kerja_dimana} />
        <MyListData label="Apakah Takut Anjing" value={item.takut_anjing} />
        <MyListData
          label="Pernah kerja diluar negri ?"
          value={item.kerja_diluar_negri}
        />
        <MyListData label="Pendidikan Terakhir" value={item.pendidikan} />
        <MyListData label="Pengalaman Kerja" value={item.pengalaman} />
        <MyListData label="Status Pernikahan" value={item.pernikahan} />
        <MyListData label="Sudah Punya Anak" value={item.punya_anak} />
        <MyListData label="Agama" value={item.agama} />
        <MyListData label="Suku Asal" value={item.suku} />
        <MyListData label="Bisa Bahasa Inggris" value={item.inggris} />
        <MyListData label="Bisa Naik Motor" value={item.naik_motor} />
        <MyListData label="Bisa Masak" value={item.bisa_masak} />
        <MyListData
          label="Bisa Asuk Bayi/Balita/Anak-anak"
          value={item.bisa_asuh}
        />
        <MyListData label="Melamar Sebagai Apa ? " value={item.sebagai_apa} />
        <MyListData label="Nomor Keluarga" value={item.hp_dapat_dihubungi} />
        <MyListData label="Referral" value={item.referral} />
        <MyListData label="Gaji Yang Diharapkan" value={item.gaji} />
        <View style={{marginTop: 30}} />
      </ScrollView>
      <MyButton
        radius={0}
        title="KIRIM LAMARAN"
        warna={colors.primary}
        onPress={() => {
          setLoading(true);
          axios
            .post('https://zavalabs.com/pembantuku/api/pelamar_add.php', item)
            .then(res => {
              console.log(res.data);
              setTimeout(() => {
                navigation.navigate('PelamarSelesai', item);
              }, 1000);
            });
        }}
      />
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
