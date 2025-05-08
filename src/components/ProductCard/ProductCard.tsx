import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {getProductCardStyles} from './ProductCardStyles';
import {Product} from '../../types/Product';
import CustomText from '../CustomText/CustomText';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductCard = ({product, onPress}: Props) => {
  const{isDark} = useTheme();
  const styles = getProductCardStyles(isDark)
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{uri: product.images[0].url}}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <CustomText style={styles.title}>{product.title}</CustomText>
        <CustomText style={styles.price}>${product.price}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
