import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../config/colors';
const AppIconButton = ({
  leftIcon,
  style,
  iconAs,
  name,
  title,
  size,

  iconColor,
  IconStyle,
  borderRadius,
  width,
  height,
  marginX,
  disabled,
  marginY,
  textStyle,
  txtColor,
  buttonBgColor,
  buttonStyle,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  isMarkIcon,
  MarkIconStyle,
  MarkIconSize,
  MarkIconColor,
  mr,
  iconKey,
}) => {
  let buttonWidth = width + 95 || 95;
  let buttonHeight = height + 40 || 38;
  let textColor = txtColor || colors.gray.trueGray900;
  let bdRadius = borderRadius || 0;
  let bgColor = buttonBgColor; //|| colors.primarypro.primary800;
  let isIconMargin = mr + 0 || 5;
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          onLongPress={onLongPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={[
            style,
            {
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: bgColor,
              borderRadius: bdRadius,
              width: buttonWidth,
              height: buttonHeight,
              marginHorizontal: marginX,
              marginVertical: marginY,
            },
          ]}>
          {leftIcon === true ? (
            <>
              {iconAs === 'FontAwesome' ? (
                <>
                  <View
                    style={[
                      buttonStyle,
                      {
                        // margin: 5,
                        // flexDirection: 'row',
                        // alignSelf: 'center',
                        // alignItems: 'center',
                        // justifyContent: 'center',
                      },
                    ]}>
                    <FontAwesome
                      style={[
                        IconStyle,
                        {
                          alignSelf: 'center',
                          marginRight: isIconMargin,
                        },
                      ]}
                      name={name}
                      size={size}
                      color={iconColor}
                    />
                    {isMarkIcon ? (
                      <>
                        <Ionicons
                          style={MarkIconStyle}
                          size={MarkIconSize}
                          color={MarkIconColor}
                          name="ios-checkmark-done-circle-sharp"
                        />
                      </>
                    ) : null}
                    <Text style={[textStyle, {color: textColor}]}>{title}</Text>
                  </View>
                </>
              ) : (
                <>
                  {iconAs === 'MaterialCommunityIcons' ? (
                    <>
                      <View
                        style={[
                          buttonStyle,
                          {
                            // margin: 5,
                            // flexDirection: 'row',
                            // alignSelf: 'center',
                            // alignItems: 'center',
                            // justifyContent: 'center',
                          },
                        ]}>
                        <MaterialCommunityIcons
                          style={[
                            IconStyle,
                            {
                              alignSelf: 'center',
                              marginRight: isIconMargin,
                            },
                          ]}
                          name={name}
                          color={iconColor}
                          size={size}
                        />
                        <Text style={[textStyle, {color: textColor}]}>
                          {title}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      {iconAs === 'MaterialIcons' ? (
                        <>
                          <View
                            style={
                              buttonStyle
                              // ? buttonStyle
                              // : {
                              //     margin: 5,
                              //     flexDirection: 'row',
                              //     alignSelf: 'center',
                              //     alignItems: 'center',
                              //     justifyContent: 'center',
                              //   }
                            }>
                            <MaterialIcons
                              key={iconKey}
                              style={[
                                IconStyle,
                                {
                                  alignSelf: 'center',
                                  marginRight: isIconMargin,
                                },
                              ]}
                              name={name}
                              size={size}
                              color={iconColor}
                            />
                            <Text>{title}</Text>
                          </View>
                        </>
                      ) : (
                        <>
                          <>
                            {iconAs === 'AntDesign' ? (
                              <>
                                <View
                                  style={[
                                    IconStyle,
                                    {
                                      margin: 5,
                                      flexDirection: 'row',
                                      alignSelf: 'center',
                                      marginRight: isIconMargin,
                                    },
                                  ]}>
                                  <AntDesign
                                    style={[
                                      IconStyle,
                                      {
                                        alignSelf: 'center',
                                        marginRight: isIconMargin,
                                      },
                                    ]}
                                    name={name}
                                    size={size}
                                    color={iconColor}
                                  />
                                  <Text>{title}</Text>
                                </View>
                              </>
                            ) : (
                              <>
                                <Text style={[textStyle, {color: textColor}]}>
                                  {title}
                                </Text>
                              </>
                            )}
                          </>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Text style={[textStyle, {color: textColor}]}>{title}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppIconButton;

const styles = StyleSheet.create({});
