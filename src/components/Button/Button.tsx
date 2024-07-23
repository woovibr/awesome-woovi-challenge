import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  textColor?: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  backgroundColor = '#1e90ff',
  borderColor = '#1e90ff',
  borderRadius = 8,
  paddingVertical = 12,
  paddingHorizontal = 24,
  textColor = '#fff',
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor, borderColor, borderRadius, paddingVertical, paddingHorizontal },
        buttonStyle,
        disabled && styles.disabled
      ]}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#d3d3d3',
    borderColor: '#d3d3d3',
  },
});

export default CustomButton;
