import React, { useContext } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import ProductCard from '../../components/ProductCard/ProductCard';
import productsData from '../../mock/Products.json';
import { MainStackParams } from '../../types/NavigationStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { getHomeStyles } from './HomeScreenStyles';
import { Product } from '../../types/Product';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon, faSun, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import CustomText from '../../components/CustomText/CustomText';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '../../store/AuthStore';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParams>>();
  const {logout} = useAuthStore();
  const { isDark, toggleTheme } = useTheme();
  const styles = getHomeStyles(isDark)

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('Details', { productId: item._id })}
    />
  );

  const handleLogout = () => {
    logout()
      Toast.show({
        type: 'success',
        text1: 'Logout Successful',
      });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} color={isDark ? 'orange' : 'black'} />
          <CustomText style={[styles.topButton, { marginLeft: 8 }]}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesomeIcon icon={faSignOutAlt} size={18} color="white" />
        </TouchableOpacity>
      </View>

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
