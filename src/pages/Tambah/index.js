import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyInput, MyGap, MyButton } from '../../components';
import { colors } from '../../utils/colors';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
export default function Tambah({ navigation, route }) {
  const [user, setUser] = useState({});
  const [kirim, setKirim] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
      setKirim({
        ...kirim,
        id_member: res.id,
      });
    });
  }, []);

  const simpan = () => {
    console.log(kirim);
    axios
      .post('https://zavalabs.com/stokku/api/barang_add.php', kirim)
      .then(res => {
        console.log(res);
      });
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}>
      <ScrollView>
        <MyInput
          label="Kode Barang / SKU"
          iconname="key"
          value={kirim.sku}
          onChangeText={val => {
            setKirim({
              ...kirim,
              sku: val,
            });
          }}
        />
        <MyGap jarak={10} />
        <MyInput
          label="Nama Barang"
          iconname="cube"
          value={kirim.nama}
          onChangeText={val => {
            setKirim({
              ...kirim,
              nama: val,
            });
          }}
        />
        <MyGap jarak={10} />
        <MyInput
          label="UOM (KG/PCS/BOX)"
          iconname="analytics"
          value={kirim.uom}
          onChangeText={val => {
            setKirim({
              ...kirim,
              uom: val,
            });
          }}
        />
        <MyGap jarak={10} />
        <MyInput
          label="Barcode"
          iconname="barcode"
          value={kirim.barcode}
          onChangeText={val => {
            setKirim({
              ...kirim,
              barcode: val,
            });
          }}
        />

        <MyGap jarak={10} />
        <MyInput
          keyboardType="number-pad"
          label="Harga"
          iconname="pricetags"
          value={kirim.harga}
          onChangeText={val => {
            setKirim({
              ...kirim,
              harga: val,
            });
          }}
        />
        <MyGap jarak={10} />
        <MyInput
          label="Stok"
          keyboardType="number-pad"
          iconname="albums"
          value={kirim.stok}
          onChangeText={val => {
            setKirim({
              ...kirim,
              stok: val,
            });
          }}
        />
        <MyGap jarak={10} />
        <MyButton onPress={simpan} title="SIMPAN" warna={colors.primary} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
