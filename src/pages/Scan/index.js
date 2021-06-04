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

export default function Sk({navigation, route}) {
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
      .post('https://zavalabs.com/stokku/api/sk.php', {
        id_member: id_member,
      })
      .then(res => {
        console.log('data barang,', res.data);
        setData(res.data);
      });
  };

  const hanldeHapus = (id, id_member) => {
    axios
      .post('https://zavalabs.com/stokku/api/sk_hapus.php', {
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
      <TouchableOpacity
        onPress={() => navigation.navigate('ScanMulai', item)}
        style={{
          marginVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          padding: 10,
          borderColor: colors.primary,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontFamily: fonts.secondary[600]}}>{item.nama}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{fontFamily: fonts.secondary[400], flex: 1}}>
            {item.tanggal}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View>
        <Text style={{fontFamily: fonts.secondary[600], color: colors.primary}}>
          {' '}
          Silahkan pilih SK terlebih dahulu :
        </Text>
      </View>

      <FlatList data={data} renderItem={__renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
