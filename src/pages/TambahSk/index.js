import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyInput, MyGap, MyButton} from '../../components';
import {colors} from '../../utils/colors';
import {getData} from '../../utils/localStorage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
export default function TambahSk({navigation, route}) {
  const [user, setUser] = useState({});
  const [kirim, setKirim] = useState({});
  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const jam = Today.getHours();
  const menit = Today.getMinutes();
  const detik = Today.getUTCSeconds();
  const today = `${dd}/${mm}/${yyyy}`;
  const TodayTime = `${jam}:${menit}`;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tanggal, setTanggal] = useState(today);
  const [tanggalSql, setTanggalSql] = useState(`${yyyy}-${mm}-${dd}`);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // alert(currentDate);

    const Today = new Date(currentDate);
    const dd = String(Today.getDate()).padStart(2, '0');
    const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = Today.getFullYear();
    const jam = Today.getHours();
    const menit = Today.getMinutes();
    const detik = Today.getUTCSeconds();
    const today = `${dd}/${mm}/${yyyy}`;

    setTanggal(`${dd}/${mm}/${yyyy}`);
    setKirim({
      ...kirim,
      tanggal: `${yyyy}-${mm}-${dd}`,
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
      setKirim({
        ...kirim,
        id_member: res.id,
        tanggal: tanggalSql,
      });
    });
  }, []);

  const simpan = () => {
    console.log(kirim);
    axios
      .post('https://zavalabs.com/stokku/api/sk_add.php', kirim)
      .then(res => {
        console.log(res);
      });
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}>
      <MyGap jarak={10} />
      <MyInput
        label="Nama SK"
        iconname="document"
        value={kirim.nama}
        onChangeText={val => {
          setKirim({
            ...kirim,
            nama: val,
          });
        }}
      />
      <MyGap jarak={10} />
      <MyInput
        onFocus={() => {
          showDatepicker();
        }}
        label="Tanggal"
        iconname="calendar"
        value={tanggal}
        onChangeText={value => setTanggal(value)}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          format="YYYY-MM-DD"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <MyGap jarak={10} />
      <MyButton onPress={simpan} title="SIMPAN" warna={colors.primary} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
