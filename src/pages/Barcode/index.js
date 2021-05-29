import React, {useState, useEffect} from 'react';
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
export default function Kamera({navigation, route}) {
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      console.log(res);
    });
  }, []);

  const isFocused = useIsFocused();

  //   alert(data.id);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [lampu, setlampu] = useState(false);
  const [key, setKey] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

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
    const kirim = {
      id_member: user.id,
      key: result.data,
    };

    alert(result.data);

    setlampu(false);
  };

  return (
    <View style={styles().container}>
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
