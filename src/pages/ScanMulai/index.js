import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import { fonts } from '../../utils/fonts';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import { Swipeable } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import { MyInput, MyGap, MyButton } from '../../components';

export default function ScanMulai({ navigation, route }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [barang, setBarang] = useState({});
  const [qty, setQty] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const isFocused = useIsFocused();

  const item = route.params;

  const refRBSheet = useRef();
  const [isModalVisible, setModalVisible] = useState(false);

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
      .post('https://zavalabs.com/stokku/api/transaksi_scan.php', {
        id_member: id_member,
        id_sk: id_sk,
      })
      .then(res => {
        console.log('data scan,', res.data);
        setData(res.data);
      });
  };

  const simpan = () => {


    const kirim = {
      id_member: user.id,
      id_sk: item.id,
      id_barang: barang.id,
      qty: qty,
      keterangan: keterangan,
    };
    console.warn(kirim)

    axios
      .post('https://zavalabs.com/stokku/api/transaksi_update.php', kirim)
      .then(res => {
        console.log('hasil update,', res.data);
        __getDataBarang(user.id, item.id);
        refRBSheet.current.close();
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
            borderColor: colors.border,
            backgroundColor: colors.white,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[600] }}>
              {item.sku}
              {` - `}
            </Text>
            <Text style={{ fontFamily: fonts.secondary[600] }}>
              {item.nama_barang}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[400], flex: 1 }}>
              Barcode : {item.barcode}
            </Text>
            <View
              style={{
                padding: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 18,
                  color: colors.primary,
                }}>
                {item.qty} {item.uom}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                flex: 1,
                color: colors.primary,
              }}>
              {item.keterangan}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                width: 100,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                refRBSheet.current.open();
                setBarang(item);
                setQty(item.qty);
                setKeterangan(item.keterangan);
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fonts.secondary[600],
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ScanManual', item)}
          style={{
            backgroundColor: colors.secondary,
            padding: 20,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon type="ionicon" name="search" size={20} color={colors.white} />
          <Text
            style={{
              left: 10,
              textAlign: 'center',
              fontFamily: fonts.secondary[600],
              color: colors.white,
            }}>
            SEARCH
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ScanKamera', item)}
          style={{
            backgroundColor: colors.primary,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Icon type="ionicon" name="camera" size={20} color={colors.white} />
          <Text
            style={{
              left: 10,
              textAlign: 'center',
              fontFamily: fonts.secondary[600],
              color: colors.white,
            }}>
            KAMERA
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ padding: 10 }}>
        <FlatList data={data} renderItem={__renderItem} />
      </ScrollView>

      <RBSheet
        animationType="slide"
        ref={refRBSheet}
        height={350}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'black',
            opacity: 0.8,
          },
          draggableIcon: {
            backgroundColor: colors.primary,
          },
        }}>
        <View
          style={{
            padding: 10,

            backgroundColor: colors.white,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 20,
                }}>
                {barang.sku} - {barang.nama_barang}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 15,
                  color: colors.secondary,
                }}>
                {barang.uom}
              </Text>
            </View>
            <TouchableOpacity onPress={() => refRBSheet.current.close()}>
              <Icon type="ionicon" name="close" size={30} />
            </TouchableOpacity>
          </View>
          <MyInput
            label="Masukan Qty"
            iconname="cube"
            value={qty}
            onChangeText={val => {
              setQty(val);
              console.log(val);
            }}
            autoFocus={true}
            keyboardType="number-pad"
          />
          {/* <MyGap jarak={10} /> */}
          <MyInput
            label="Masukan Keterangan/Lokasi"
            iconname="document"
            value={keterangan}
            onChangeText={val => {
              setKeterangan(val);
              console.log(val);
            }}
          />
          <MyGap jarak={10} />
          <MyButton title="SIMPAN" onPress={simpan} warna={colors.primary} />
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
