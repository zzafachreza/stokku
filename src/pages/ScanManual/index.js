import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {MyHeader, MyInput, MyButton, MyGap} from '../../components';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import {colors} from '../../utils/colors';
import LottieView from 'lottie-react-native';
import {fonts} from '../../utils/fonts';
import {getData} from '../../utils/localStorage';
import {Swipeable} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function ScanMaual({navigation, route}) {
  const item = route.params;
  const refRBSheet = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [key, setKey] = useState('');
  const [cari, setCari] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [barang, setBarang] = useState({});
  const [qty, setQty] = useState('');
  const [keterangan, setKeterangan] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
    });
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const simpan = () => {
    const kirim = {
      id_member: user.id,
      id_sk: item.id,
      id_barang: barang.id,
      qty: qty,
      keterangan: keterangan,
    };

    axios
      .post('https://zavalabs.com/stokku/api/transaksi_add.php', kirim)
      .then(res => {
        console.log('data scan,', res.data);
        navigation.navigate('ScanMulai');
      });
  };

  const [data, setData] = useState([]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setBarang(item);
          refRBSheet.current.open();
          setTheInput(true);
        }}
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

          <View style={{backgroundColor: colors.secondary, padding: 10}}>
            <Text style={{fontFamily: fonts.secondary[600]}}>{item.uom}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const pencarian = () => {
    setLoading(true);
    setTimeout(() => {
      setCari(true);
      axios
        .post('https://zavalabs.com/stokku/api/barang_cari_manual.php', {
          key: key,
          id_member: user.id,
        })
        .then(res => {
          console.log('hasil cari', res.data);
          setData(res.data);
          // setData(res.data.data);
        });
      setLoading(false);
    }, 500);
  };

  const [theInput, setTheInput] = useState(false);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            // flex: 1,
            backgroundColor: colors.primary,
            height: 70,
            flexDirection: 'row',

            padding: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon type="ionicon" name="arrow-back" color="#FFF" size={25} />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
              }}>
              <TextInput
                value={key}
                onSubmitEditing={pencarian}
                onChangeText={value => setKey(value)}
                selectionColor={'#FFF'}
                autoCapitalize="none"
                autoFocus
                style={{
                  paddingLeft: 20,
                  borderWidth: 1,
                  height: 45,
                  borderRadius: 10,
                  borderColor: '#FFF',
                  color: '#FFF',
                  flexDirection: 'row',
                  fontSize: 18,
                  justifyContent: 'center',
                }}
              />
            </View>
          </View>
        </View>
        {cari && (
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
              <Icon
                type="ionicon"
                name="search"
                color={colors.primary}
                size={16}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: colors.primary,
                  left: 10,
                  fontSize: 16,
                }}>
                Kata Kunci "{key}"
              </Text>
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{flex: 1, backgroundColor: colors.primary}}
        />
      )}
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
                {barang.sku} - {barang.nama}
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
            autoFocus={theInput}
            label="Masukan Qty"
            iconname="cube"
            value={qty}
            onChangeText={val => {
              setQty(val);
              console.log(val);
            }}
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
    </>
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
