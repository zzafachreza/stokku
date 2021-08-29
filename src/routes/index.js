import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  GetStarted,
  Login,
  Register,
  Home,
  Account,
  Success,
  Berita,
  Success2,
  ListDetail,
  Edit,
  Pelamar,
  PelamarDetail,
  PelamarSelesai,
  Search,
  Pembantu,
  Kategori,
  PembantuSelsai,
  ListData,
  Notifikasi,
  Barcode,
  Barang,
  Master,
  Tambah,
  Premium,
  Sk,
  Scan,
  Report,
  TambahSk,
  ScanMulai,
  ScanManual,
  ScanKamera,
  ReportDetail,
  Panduan,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';
import {colors} from '../utils/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Transaksi" component={Report} /> */}
      {/* <Tab.Screen name="Scan" component={Scan} /> */}
      <Tab.Screen name="Barang" component={Barang} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName={'Splash'}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Tambah"
        component={Tambah}
        options={{
          headerTitle: 'Tambah - Barang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        }}
      />

      <Stack.Screen
        name="TambahSk"
        component={TambahSk}
        options={{
          headerTitle: 'Tambah - SK',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        }}
      />

      <Stack.Screen
        name="Panduan"
        component={Panduan}
        options={{
          headerTitle: 'Panduan - Aplikasi STOK-KU',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        }}
      />

      <Stack.Screen
        name="ScanMulai"
        component={ScanMulai}
        options={({route, navigation}) => ({
          title: 'Detail',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        })}
      />

      <Stack.Screen
        name="ReportDetail"
        component={ReportDetail}
        options={({route, navigation}) => ({
          title: 'Detail ',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        })}
      />

      <Stack.Screen
        name="ScanManual"
        component={ScanManual}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ScanKamera"
        component={ScanKamera}
        options={({route, navigation}) => ({
          title: 'Scan Kamera',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        })}
      />

      <Stack.Screen
        name="Premium"
        component={Premium}
        options={{
          headerTitle: 'Upgrade Premium',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        }}
      />
      <Stack.Screen
        name="Sk"
        component={Sk}
        options={{
          headerTitle: 'Setting SK (Surat Kerja)',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        }}
      />
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{
          headerTitle: 'Mulai Stock Opname',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          headerTitle: 'Laporan Stock Opname',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
        }}
      />

      <Stack.Screen
        name="ListData"
        component={ListData}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PelamarSelesai"
        component={PelamarSelesai}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Berita"
        component={Berita}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Success2"
        component={Success2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: 'Login',
          headerShown: false,

          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: 'Register',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Barcode"
        component={Barcode}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Master"
        component={Master}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PembantuSelesai"
        component={PembantuSelsai}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Kategori"
        component={Kategori}
        options={({route, navigation}) => ({
          title: 'Detail Pembantu',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Pembantu"
        component={Pembantu}
        options={({route, navigation}) => ({
          title: 'Detail Pembantu',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
