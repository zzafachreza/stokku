import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../utils/colors';

export default function BottomNavigator({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';

        if (label === 'Home') {
          iconName = 'home';
        } else if (label === 'Account') {
          iconName = 'person';
        } else if (label === 'Scan') {
          iconName = 'barcode';
        } else if (label === 'Barang') {
          iconName = 'cube';
        } else if (label === 'Transaksi') {
          iconName = 'list';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View
              style={{
                color: isFocused ? colors.primary : '#919095',
                backgroundColor: isFocused ? 'white' : '#FFFFFF',
                paddingTop: 5,
                paddingBottom: 0,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <View
                style={{
                  position: iconName === 'barcodea' ? 'absolute' : 'relative',
                  backgroundColor:
                    iconName === 'barcodea' ? colors.primary : 'white',
                  // borderTopWidth: iconName === 'barcode' && isFocused ? 5 : 0,
                  borderWidth: 7,

                  // borderColor: 'red',
                  // padding: 10,
                  // position: 'absolute',
                  position: iconName === 'barcodea' ? 'absolute' : 'relative',
                  borderColor: iconName === 'barcodea' ? 'white' : 'white',
                  borderRadius: iconName === 'barcodea' ? 50 : 0,
                  width: iconName === 'barcodea' ? 90 : 80,
                  marginBottom: iconName === 'barcodea' ? 0 : 0,
                  bottom: iconName === 'barcodea' ? -45 : 0,
                  height: iconName === 'barcodea' ? 90 : 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {iconName === 'barcodea' ? (
                  <Icon
                    name={iconName}
                    type="ionicon"
                    color={isFocused ? 'white' : 'white'}
                  />
                ) : (
                  <Icon
                    name={iconName}
                    type="ionicon"
                    color={isFocused ? colors.primary : '#919095'}
                  />
                )}
                <Text
                  style={{
                    color:
                      isFocused && iconName == 'barcodea'
                        ? 'white'
                        : !isFocused && iconName == 'barcodea'
                        ? 'white'
                        : isFocused
                        ? colors.primary
                        : '#919095',
                  }}>
                  {label == 'Barang' ? 'Stokku' : label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: iconName => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: iconName => ({}),
});
