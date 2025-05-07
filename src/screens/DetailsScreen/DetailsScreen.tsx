import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { styles } from './DetailsScreenStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '../../types/NavigationStack';
import productsData from '../../mock/Products.json'

type Props = NativeStackScreenProps<MainStackParams, 'Details'>;

const DetailsScreen = ({ route }: Props) => {
  const { productId } = route.params;
  
  const product = productsData.data.find(item => item._id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.images[0].url }}
        style={styles.detailImage}
        resizeMode="contain"
      />
      <View style={styles.detailContent}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;