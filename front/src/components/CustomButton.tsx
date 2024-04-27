import React from 'react';
import {Pressable, StyleSheet, Text, PressableProps, Dimensions, View} from 'react-native';
import { colors } from '../constants';

interface CustomButtonProps extends PressableProps {
    label: string;
    varient?: 'filled' | 'outlined';
    size?: 'large' | 'medium';
    inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
    label,
    varient = 'filled',
    size = 'large',
    inValid = false,
    ...props
}: CustomButtonProps) {
  return (
    <Pressable
        disabled={inValid}
        style={({pressed}) => [
            styles.container,
            pressed ? styles[`${varient}Pressed`] : styles[varient],
            inValid && styles.inValid
        ]}
        {...props}
    >
      <View style={styles[size]}>
        <Text style={[styles.text, styles[`${varient}Text`]]}>{label}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    inValid: {
        opacity: 0.5,
    },
    filled: {
        backgroundColor: colors.PINK_700,
    },
    outlined: {
        borderColor: colors.PINK_700,
        borderWidth: 1,
    },
    filledPressed: {
      backgroundColor: colors.PINK_500,
    },
    outlinedPressed: {
      borderColor: colors.PINK_700,
      borderWidth: 1,
      opacity: 0.5,
    },
    large: {
        width: '100%',
        paddingVertical: deviceHeight > 700 ? 15 : 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    medium: {
        width: '50%',
        paddingVertical: deviceHeight > 700 ? 12 : 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
    },
    filledText: {
        color: colors.WHITE,
    },
    outlinedText: {
        color: colors.PINK_700,
    },
});

export default CustomButton;