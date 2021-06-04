import React, {useState, useEffect} from 'react';
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
import {colors} from '../../utils/colors';
import {useIsFocused} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {Swipeable} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

export default function ReportDetail({navigation, route}) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const item = route.params;

  navigation.setOptions({title: item.nama});

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

  const __renderItem = ({item}) => {
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
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: fonts.secondary[600]}}>
              {item.sku}
              {` - `}
            </Text>
            <Text style={{fontFamily: fonts.secondary[600]}}>
              {item.nama_barang}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: fonts.secondary[400], flex: 1}}>
              Barcode : {item.barcode}
            </Text>
            <View
              style={{
                padding: 10,
              }}>
              <Text style={{fontFamily: fonts.secondary[600], fontSize: 18}}>
                {item.stok}
              </Text>
            </View>
            <View style={{backgroundColor: colors.primary, padding: 10}}>
              <Text
                style={{fontFamily: fonts.secondary[600], color: colors.white}}>
                {item.uom}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              flex: 1,
              color: colors.primary,
            }}>
            {item.keterangan}
          </Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={{}}>
      <ScrollView style={{padding: 10}}>
        <FlatList data={data} renderItem={__renderItem} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
