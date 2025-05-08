import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const CustomText = ({ style, children, ...props }: TextProps) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat', 
  },
});

export default CustomText;
