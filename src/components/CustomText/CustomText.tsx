import React from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './CustomTextStyle';

const CustomText = ({ style, children, ...props }: TextProps) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};
export default CustomText;
