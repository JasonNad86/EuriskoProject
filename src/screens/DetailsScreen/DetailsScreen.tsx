import React from 'react';
import { Button, Image, ScrollView, View } from 'react-native';
import { styles } from './DetailsScreenStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '../../types/NavigationStack';
import productsData from '../../mock/Products.json'
import CustomText from '../../components/CustomText';

type Props = NativeStackScreenProps<MainStackParams, 'Details'>;

const DetailsScreen = ({ route }: Props) => {
  const { productId } = route.params;
  
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
      <View style={{flex:1, flexDirection:'row', justifyContent:"flex-end"}}>
      <Button title='Share Product'></Button>
        <Button title='Shopping cart'></Button>
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