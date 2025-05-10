import React from 'react';
import { Image, ScrollView, View, TouchableOpacity } from 'react-native';
import { getDetailsStyles } from './DetailsScreenStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '../../types/NavigationStack';
import productsData from '../../mock/Products.json';
import CustomText from '../../components/CustomText/CustomText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart, faShare, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<MainStackParams, 'Details'>;

const DetailsScreen = ({ route }: Props) => {
  const { productId } = route.params;
  const { isDark, toggleTheme } = useTheme();
  const styles = getDetailsStyles(isDark)

  const product = productsData.data.find(item => item._id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <CustomText>Product not found</CustomText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconBar}>
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} color={isDark ? 'orange' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesomeIcon icon={faShoppingCart} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesomeIcon icon={faShare} color="blue" />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={{ uri: product.images[0].url }}
          style={styles.detailImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailContent}>
        <CustomText style={styles.title}>{product.title}</CustomText>
        <CustomText style={styles.price}>${product.price}</CustomText>
        <CustomText style={styles.description}>{product.description}</CustomText>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
