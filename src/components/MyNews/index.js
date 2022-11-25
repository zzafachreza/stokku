import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function MyNews() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        // flex: 1,
        // backgroundColor: 'red',
        paddingVertical: 10,
        flexDirection: 'row',
        // justifyContent: 'space-between',
      }}>
      {/* batas */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Berita', {
            url: 'https://kipmi.or.id/pembuatan-mix-design-beton-normal.html',
          })
        }
        activeOpacity={0.9}
        style={{
          flex: 1,
          margin: 5,
          height: 200,
          borderRadius: 10,
          backgroundColor: 'white',
          overflow: 'hidden',
          elevation: 1,
        }}>
        <Image
          // resizeMode="contain"
          source={{
            uri:
              'https://kipmi.or.id/wp-content/uploads/2017/01/molen-kecil.jpg',
          }}
          style={{width: 200, aspectRatio: 1.5}}
        />
        <View style={{padding: 10}}>
          <Text style={{fontSize: 14, fontFamily: fonts.secondary[600]}}>
            Pembuatan Mix Design Beton Normal
          </Text>
          <Text style={{fontSize: 9, fontFamily: fonts.secondary[400]}}>
            Yhouga Ariesta Moppratama
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Berita', {
            url:
              'https://kipmi.or.id/panduan-memilih-beton-yang-berkualitas.html',
          })
        }
        activeOpacity={0.9}
        style={{
          flex: 1,
          margin: 5,
          height: 200,
          borderRadius: 10,
          backgroundColor: 'white',
          overflow: 'hidden',
          elevation: 1,
        }}>
        <Image
          // resizeMode="contain"
          source={{
            uri:
              'https://kipmi.or.id/wp-content/uploads/2016/11/m1-beton-towarowy.jpg',
          }}
          style={{width: 200, aspectRatio: 1.5}}
        />
        <View style={{padding: 10}}>
          <Text style={{fontSize: 14, fontFamily: fonts.secondary[600]}}>
            Panduan Memilih Beton yang Berkualitas
          </Text>
          <Text style={{fontSize: 9, fontFamily: fonts.secondary[400]}}>
            Yhouga Ariesta Moppratama
          </Text>
        </View>
      </TouchableOpacity>

      {/* batas */}
    </View>
  );
}

const styles = StyleSheet.create({});
