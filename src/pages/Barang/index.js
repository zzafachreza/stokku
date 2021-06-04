import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

export default function Barang({navigation, route}) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getData('user').then(res => {
        console.log(res);
        setUser(res);
        __getDataBarang(res.id);
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
      });
  };

  const __renderItem = ({item}) => {
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
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: fonts.secondary[600]}}>
              {item.sku}
              {` - `}
            </Text>
            <Text style={{fontFamily: fonts.secondary[600]}}>{item.nama}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: fonts.secondary[400], flex: 1}}>
              Barcode : {item.barcode}
            </Text>
            <View style={{padding: 10}}>
              <Text style={{fontFamily: fonts.secondary[600]}}>
                {item.stok}
              </Text>
            </View>
            <View style={{backgroundColor: colors.secondary, padding: 10}}>
              <Text style={{fontFamily: fonts.secondary[600]}}>{item.uom}</Text>
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
      <View>
        <MyButton
          onPress={() => navigation.navigate('Tambah')}
          title="TAMBAH BARANG"
          warna={colors.primary}
        />
      </View>

      <FlatList data={data} renderItem={__renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
