import React from 'react';
import { FlatList, View } from 'react-native';
import ProductCard from '../../components/ProductCard/ProductCard';
import productsData from '../../mock/Products.json'
import { MainStackParams } from '../../types/NavigationStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { styles } from './HomeScreenStyles';
import { Product } from '../../types/Product';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('Details', { productId: item._id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productsData.data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default HomeScreen;