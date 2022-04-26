import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';

import { getData } from '../../utils/localStorage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyButton } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
export default function Barang({ navigation, route }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [tipe, setTipe] = useState(true);
  const isFocused = useIsFocused();
  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getData('user').then(res => {
        console.log('data_user', res);
        setUser(res);
        __getDataBarang(res.id);
        __getTipe(res.id);
      });
    }
  }, [isFocused]);

  const __getDataBarang = id_member => {
    axios
      .post('https://zavalabs.com/stokku/api/barang.php', {
        id_member: id_member,
      })
      .then(res => {
        console.log('data barang,', res.data);
        setData(res.data);
        __getTipe(id_member)
      });
  };


  const __getTipe = id_member => {
    axios
      .post('https://zavalabs.com/stokku/api/tipe.php', {
        id_member: id_member,
      })
      .then(res => {
        console.log('data tipe,', res.data);
        setTipe(res.data);

      });
  };

  const hanldeHapus = (id, id_member) => {
    axios
      .post('https://zavalabs.com/stokku/api/barang_hapus.php', {
        id: id,
        id_member: id_member,
      })
      .then(res => {
        console.log('delete', res);
        __getDataBarang(id_member);
        __getTipe(id_member);
      });
  };

  const __renderItem = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => hanldeHapus(item.id, item.id_member)}>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  //   backgroundColor: 'blue',
                  // padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="ionicon"
                  name="trash"
                  size={40}
                  color={colors.danger}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        }}>
        <View
          style={{
            marginVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            borderColor: colors.primary,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[600] }}>
              {item.sku}
              {` - `}
            </Text>
            <Text style={{ fontFamily: fonts.secondary[600] }}>{item.nama}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[600] }}>
              Harga : Rp. {new Intl.NumberFormat().format(item.harga)}

            </Text>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[400], flex: 1 }}>
              Barcode : {item.barcode}
            </Text>
            <View style={{ padding: 10 }}>
              <Text style={{ fontFamily: fonts.secondary[600] }}>
                {item.stok}
              </Text>
            </View>
            <View style={{ backgroundColor: colors.secondary, padding: 10 }}>
              <Text style={{ fontFamily: fonts.secondary[600] }}>{item.uom}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>

            <View style={{ padding: 10, flex: 1 }}>
              <Text style={{ fontFamily: fonts.secondary[600], }}>
                Total Harga
              </Text>
            </View>
            <View style={{ backgroundColor: colors.primary, padding: 10 }}>
              <Text style={{ fontFamily: fonts.secondary[600], color: colors.white }}>Rp. {new Intl.NumberFormat().format(item.harga * item.stok)}
              </Text>
            </View>
          </View>

        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}>


      <MyButton
        onPress={() => {

          if (tipe) {
            navigation.navigate('Tambah')
          } else {
            alert('Maaf Akun anda harus di UPGRADE');
            navigation.navigate('Premium')
          }


        }}
        title="TAMBAH BARANG"
        warna={tipe ? colors.primary : colors.border}
        colorText={tipe ? colors.white : colors.black}
      />


      <FlatList data={data} renderItem={__renderItem} />
      <View style={{
        padding: 10
      }}>
        <MyButton onPress={() => {


          Linking.openURL('https://zavalabs.com/stokku/api/print_barang.php?id_member=' + user.id);

        }} title="PRINT / SHARE" warna={colors.danger} Icons="share-social-outline" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
