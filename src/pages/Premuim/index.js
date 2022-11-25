import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import axios from 'axios';

export default function Premium() {
  const [user, setUser] = useState({});
  const [tipe, setTipe] = useState('FREE');
  useEffect(() => {

    getData('user').then(res => {
      console.log('data_user', res);
      setUser(res);
      __getTipe(res.id);

    });
  }, [])

  const __getTipe = id_member => {
    axios
      .post('https://zavalabs.com/stokku/api/tipe2.php', {
        id_member: id_member,
      })
      .then(res => {
        console.log('data tipe,', res.data);
        setTipe(res.data);

      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',

        padding: 10,
      }}>
      {tipe == 'FREE' &&
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 10,

            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: 25,
            }}>
            Fitur Upgrade Premium
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.white,
              fontSize: 18,
            }}>
            Segera Upgrade Akun Anda Menjadi Premium, Fitur ini untuk menambah
            kapasitas list Produk yang didaftarkan.
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://zavalabs.com/stokku/bayar/transaksi/snap/index.php?bulan=1&harga=20000&id_member=' + user.id,
              );
            }}
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <Icon type="ionicon" name="cloud-upload-outline" color={colors.primary} />
            <Text
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary[600],
                fontSize: 18,
                left: 10,
              }}>
              Upgrade Sekarang 1 Bulan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://zavalabs.com/stokku/bayar/transaksi/snap/index.php?bulan=3&harga=55000&id_member=' + user.id,
              );
            }}
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <Icon type="ionicon" name="cloud-upload-outline" color={colors.primary} />
            <Text
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary[600],
                fontSize: 18,
                left: 10,
              }}>
              Upgrade Sekarang 3 Bulan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://zavalabs.com/stokku/bayar/transaksi/snap/index.php?bulan=6&harga=110000&id_member=' + user.id,
              );
            }}
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <Icon type="ionicon" name="cloud-upload-outline" color={colors.primary} />
            <Text
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary[600],
                fontSize: 18,
                left: 10,
              }}>
              Upgrade Sekarang 6 Bulan
            </Text>
          </TouchableOpacity>
        </View>
      }

      {tipe == 'PREMIUM' &&
        <View
          style={{
            height: 300,
            backgroundColor: colors.success,
            borderRadius: 10,

            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: 25,
            }}>
            Akun Anda Premium
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.white,
              fontSize: 18,
            }}>
            Sekarang Anda dapat tambahkan list produk sesuka Anda !
          </Text>
          <View style={{

            padding: 20,
          }}>
            <Icon type="ionicon" size={150} name="shield-checkmark-outline" color={colors.white} />
          </View>

        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({});
