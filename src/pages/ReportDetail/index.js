import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import { colors } from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import { fonts } from '../../utils/fonts';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import { Swipeable } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { MyButton } from '../../components';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default function ReportDetail({ navigation, route }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const item = route.params;

  navigation.setOptions({ title: item.nama });



  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getData('user').then(res => {
        console.log(res);
        setUser(res);
        console.log('item aaa', item);

        __getDataBarang(res.id, route.params.id);
      });
    }
  }, [isFocused]);

  const __getDataBarang = (id_member, id_sk) => {
    axios
      .post('https://zavalabs.com/stokku/api/transaksi.php', {
        id_member: id_member,
        id_sk: id_sk,
      })
      .then(res => {
        console.log('data scan soubel,', res.data);
        setData(res.data);
      });
  };

  const hanldeHapus = (id, id_member, id_sk) => {
    console.log(id_member + id + id_sk);
    axios
      .post('https://zavalabs.com/stokku/api/transaksi_scan_hapus.php', {
        id: id,
        id_member: id_member,
      })
      .then(res => {
        console.log('delete', res);
        __getDataBarang(id_member, id_sk);
      });
  };


  const cetakShare = (x) => {
    alert()
  }


  const __renderItem = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => hanldeHapus(item.id, user.id, route.params.id)}>
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
            flexDirection: 'row',
          }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: fonts.secondary[600], maxWidth: 100 }}>
                {item.sku}
                {` - `}
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.secondary[600],
                  maxWidth: 100,
                }}>
                {item.nama_barang}
              </Text>
            </View>

            <View>
              <Text style={{ fontFamily: fonts.secondary[400], flex: 1 }}>
                Barcode : {item.barcode}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  flex: 1,
                  color: colors.primary,
                }}>
                {item.keterangan}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'red',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={{ fontFamily: fonts.secondary[600] }}>Stok</Text>
              <Text style={{ fontFamily: fonts.secondary[400], top: 10 }}>
                {item.stok}
              </Text>
            </View>
            {item.status == "OPEN" && <>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text style={{ fontFamily: fonts.secondary[600] }}>SO</Text>
                <Text style={{ fontFamily: fonts.secondary[400], top: 10 }}>
                  {item.qty}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text style={{ fontFamily: fonts.secondary[600] }}>Balance</Text>
                <Text style={{ fontFamily: fonts.secondary[400], top: 10 }}>
                  {parseFloat(item.selisih)}
                </Text>
              </View></>}


            {item.status == "POSTED" && <>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text style={{ fontFamily: fonts.secondary[600] }}>Selisih</Text>
                <Text style={{ fontFamily: fonts.secondary[400], top: 10 }}>
                  {parseFloat(item.selisih)}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text style={{ fontFamily: fonts.secondary[600] }}>Harga</Text>
                <Text style={{ fontFamily: fonts.secondary[400], top: 10 }}>
                  {new Intl.NumberFormat().format(item.harga)}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text style={{ fontFamily: fonts.secondary[600] }}>Total</Text>
                <Text style={{ fontFamily: fonts.secondary[400], top: 10 }}>
                  {new Intl.NumberFormat().format(parseFloat(item.stok) * parseFloat(item.harga))}

                </Text>
              </View></>}
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>
        <FlatList data={data} renderItem={__renderItem} />
      </ScrollView>
      <View style={{
        padding: 10
      }}>
        <MyButton onPress={() => {


          Linking.openURL('https://zavalabs.com/stokku/api/print.php?id_sk=' + item.id);

        }} title="PRINT / SHARE" warna={colors.danger} Icons="share-social-outline" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
