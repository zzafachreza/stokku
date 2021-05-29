import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {MyButton} from '..';

export default function MyTerbaik() {
  useEffect(() => {
    // axios.get('https://zavalabs.com/pembantuku/api/pelamar.php').then(res => {
    //   console.log(res.data);
    //   setData(res.data);
    //   // setData(res.data.data);
    // });
  }, []);

  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      nama: 'IBU DAN BAYI',
      image:
        'https://www.bundahomecare.com/wp-content/uploads/2021/03/Cover-Webiste-Thumbnil.png',
    },
    {
      nama: 'ANAK (BALITA)',
      image: 'https://www.bundahomecare.com/wp-content/uploads/2021/03/TB2.png',
    },
    {
      nama: 'FISIOTERAPI ANAK',
      image:
        'https://www.bundahomecare.com/wp-content/uploads/2021/03/TB-3.png',
    },
    {
      nama: 'SUNTIK',
      image:
        'https://www.bundahomecare.com/wp-content/uploads/2021/03/TB-5.png',
    },
    {
      nama: 'FISIOTERAPI DEWASA',
      image:
        'https://www.bundahomecare.com/wp-content/uploads/2021/03/TB-4.png',
    },
    {
      nama: 'LANSIA',
      image:
        'https://www.bundahomecare.com/wp-content/uploads/2021/03/TB-6.png',
    },
    {
      nama: 'DOKTER UMUM',
      image:
        'https://www.bundahomecare.com/wp-content/uploads/2021/03/TB-7.png',
    },
    {
      nama: 'DOKTER SPESIALIST',
      image: 'https://www.bundahomecare.com/wp-content/uploads/2021/03/8.png',
    },
    {
      nama: 'SUNPERLEGKAPAN MEDIS',
      image: 'https://www.bundahomecare.com/wp-content/uploads/2021/03/9.png',
    },
    {
      nama: 'MAINAN BAYI',
      image: 'https://www.bundahomecare.com/wp-content/uploads/2021/03/11.png',
    },
    {
      nama: 'PERLENGKAPAN IBU MENYUSUI',
      image: 'https://www.bundahomecare.com/wp-content/uploads/2021/03/10.png',
    },
  ]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Pembantu', item)}
        activeOpacity={1.0}>
        <Image style={styles.image} source={{uri: item.image}} />
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 14,
              backgroundColor: colors.secondary,
              paddingHorizontal: 20,
              color: colors.white,
            }}>
            {item.nama}
          </Text>
        </View> */}
        <View style={styles.detailsContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.title}>HOME CARE</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.subTitle}>{item.nama}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            // borderRadius: 10,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            flexDirection: 'row',
          }}>
          <Icon type="ionicon" name="send" color={colors.white} size={18} />
          <Text
            style={{
              color: colors.white,
              fontSize: 12,
              left: 5,
              fontFamily: fonts.primary[600],
              // fontWeight: fontWeight,
            }}>
            PESAN SEKARANG
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Icon type="ionicon" name="grid" color={colors.primary} size={16} />
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: colors.primary,
              left: 10,
              fontSize: 16,
            }}>
            SERVICE
          </Text>
        </View>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  image: {
    width: 180,
    height: 200,
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 7,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: colors.primary,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});
