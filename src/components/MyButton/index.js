import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';

export default function MyButton({
  title,
  warna,
  onPress,
  Icons,
  radius = 10,
  colorText = 'white',
  fontWeight = 'normal',
  iconColor = 'white',
}) {
  return (
    <TouchableOpacity style={styles(warna, radius).btn} onPress={onPress}>
      <Icon type="ionicon" name={Icons} color={iconColor} size={18} />
      <Text
        style={{
          color: colorText,
          fontSize: 18,
          left: 5,
          fontFamily: fonts.primary[600],
          // fontWeight: fontWeight,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = (warna, radius) =>
  StyleSheet.create({
    btn: {
      height: 50,
      borderRadius: radius,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: warna,
      flexDirection: 'row',
    },
  });
