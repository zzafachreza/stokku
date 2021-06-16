import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Icon, ListItem} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {colors} from '../../utils/colors';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import BarcodeMask from 'react-native-barcode-mask';
import RBSheet from 'react-native-raw-bottom-sheet';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
export default function ScanKamera({navigation, route}) {
  const item = route.params;
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      console.log(res);
    });
  }, []);

  const [data, setData] = useState([]);

  const [qty, setQty] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();
  const refRBSheet = useRef();

  //   alert(data.id);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [lampu, setlampu] = useState(false);
  const [key, setKey] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [openCamera, setOpenCamera] = useState(true);
  const [barang, setBarang] = useState({});

  const top = new Animated.Value(0);
  const bottom = new Animated.Value(1);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: windowHeight / 4,
          duration: 1000,
          // delay: 2000,
        }),
        Animated.timing(top, {
          toValue: 0,
          duration: 1000,
        }),
      ]),
      {
        iterations: 10,
      },
    ).start();
  };

  isFocused ? animasi() : null;

  const barcodeReceived = result => {
    // setLoading(true);
    axios
      .post('https://zavalabs.com/stokku/api/barang_cari.php', {
        key: result.data,
        id_member: user.id,
      })
      .then(res => {
        console.log('data hasil sscan kamera', res.data[0]);
        setBarang(res.data[0]);
      });

    setOpenCamera(false);

    refRBSheet.current.open();

    setlampu(false);
  };

  const simpan = () => {
    const kirim = {
      id_member: user.id,
      id_sk: item.id,
      id_barang: barang.id,
      qty: qty,
      keterangan: keterangan,
    };

    refRBSheet.current.close();

    navigation.navigate('ScanMulai');

    axios
      .post('https://zavalabs.com/stokku/api/transaksi_add.php', kirim)
      .then(res => {
        console.log('data scan,', res.data);
        navigation.navigate('ScanMulai');
      });
  };

  return (
    <View style={styles().container}>
      {openCamera && (
        <RNCamera
          style={styles().preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={
            lampu
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={barcodeReceived}>
          <BarcodeMask edgeColor={colors.primary} />
        </RNCamera>
      )}
      {!lampu ? (
        <TouchableOpacity
          onPress={() => setlampu(true)}
          style={{
            width: '100%',
            backgroundColor: colors.primary,
            padding: 10,
          }}>
          <Icon name="flash" type="font-awesome" color="white" size={35} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setlampu(false)}
          style={{
            width: '100%',
            backgroundColor: 'grey',
            padding: 10,
          }}>
          <Icon name="times" type="font-awesome" color="white" size={35} />
        </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
                setOpenCamera(true);
              }}>
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
            style={{display: 'none'}}
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
    </View>
  );
}

const styles = windowHeight =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      // margin: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
    box: {
      width: '80%',
      height: windowHeight / 4,
      // borderRadius: 10,
      borderWidth: 2,
      // justifyContent: 'center',
      borderColor: 'grey',
      padding: 1,
      marginBottom: '5%',
    },
    line: {},
  });
