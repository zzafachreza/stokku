import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

export default function Premium() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 50,
      }}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            'https://api.whatsapp.com/send?text=Hallo%20Kak%20saya%20mau%20Upgrade%20Stokku&phone=6285724132467',
          );
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary,
          padding: 20,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: colors.white,
            fontFamily: fonts.secondary[600],
            fontSize: 18,
          }}>
          Upgrade Sekarang
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
