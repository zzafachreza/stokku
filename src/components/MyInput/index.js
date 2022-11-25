import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, ListItem, Button} from 'react-native-elements';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {TextInput} from 'react-native-gesture-handler';

export default function MyInput({
  onFocus,
  label,
  autoFocus,
  iconname,
  onSubmitEditing,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  textColor = colors.black,
  labelColor = colors.primary,
  borderColor = colors.primary,
  colorIcon = colors.primary,
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: labelColor,
            left: 10,
            fontSize: 16,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>
      {label2 && (
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: 10,
            fontSize: 14,
            marginVertical: 1,
            ...styleLabel,
          }}>
          {label2}
        </Text>
      )}
      <TextInput
        onSubmitEditing={onSubmitEditing}
        autoFocus={autoFocus}
        onFocus={onFocus}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          color: textColor,
          borderColor: borderColor,
          borderRadius: 10,
          borderWidth: 1,
          paddingLeft: 10,
          fontSize: 18,
          fontFamily: fonts.primary[400],
          ...styleInput,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
