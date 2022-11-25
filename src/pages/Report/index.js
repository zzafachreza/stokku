import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

import { getData } from '../../utils/localStorage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyButton, MyGap } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import PushNotification from 'react-native-push-notification';

export default function Report({ navigation, route }) {
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
        console.log('data sk number,', res.data);
        setData(res.data);
      });
  };

  const posting = (id, id_member) => {
    // cek minus

    axios
      .post('https://zavalabs.com/stokku/api/cek_posting.php', {
        id: id,
        id_member: id_member,
      })
      .then(res => {
        console.log('cek',);
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: 'zvl-stokku', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          title: 'Stokku - Informasi', // (optional)
          message: 'Maaf ada product yang masih minus (' + res.data + ')', // (required)
        });

        axios
          .post('https://zavalabs.com/stokku/api/sk_posting.php', {
            id: id,
            id_member: id_member,
          })
          .then(res => {
            console.log('delete', res);
            __getDataBarang(id_member);
          });
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

  const __renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('ReportDetail', item)}
          style={{
            marginVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            borderColor: colors.primary,
            flexDirection: 'row',
          }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.secondary[600] }}>{item.nama}</Text>
            <Text style={{ fontFamily: fonts.secondary[400] }}>
              {item.tanggal}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              backgroundColor:
                item.status == 'OPEN' ? colors.danger : colors.success,
            }}>
            <Text
              style={{ fontFamily: fonts.secondary[600], color: colors.white }}>
              {item.status}
            </Text>
          </View>
        </TouchableOpacity>
        {item.status == 'OPEN' ? (
          <>
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => posting(item.id, item.id_member)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: colors.primary,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                  }}>
                  POSTING
                </Text>
              </TouchableOpacity>
            </View>
            <MyGap jarak={10} />
          </>
        ) : (
          <View></View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View>
        <Text style={{ fontFamily: fonts.secondary[600], color: colors.primary }}>
          {' '}
          Silahkan pilih SK terlebih dahulu :
        </Text>
      </View>

      <FlatList data={data} renderItem={__renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
