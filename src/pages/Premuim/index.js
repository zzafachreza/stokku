import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';

export default function Premium() {
  const [user, setUser] = useState({});
  useEffect(() => {

    getData('user').then(res => {
      console.log('data_user', res);
      setUser(res);

    });
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',

        padding: 10,
      }}>
      <View
        style={{
          height: 300,
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
              'https://zavalabs.com/stokku/bayar/transaksi/snap/index.php?id_member=' + user.id,
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
            Upgrade Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
