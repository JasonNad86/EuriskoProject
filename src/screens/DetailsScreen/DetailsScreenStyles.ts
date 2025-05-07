import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
          paddingTop:8
        },
        detailImage: {
          width: '100%',
          height: 300,
        },
        detailContent: {
          padding: 16,
        },
        title: {
          fontSize: 24,
          fontWeight: '600',
          marginBottom: 8,
        },
        price: {
          fontSize: 20,
          fontWeight: '500',
          color: '#666',
          marginBottom: 16,
        },
        description: {
          fontSize: 16,
          lineHeight: 24,
          color: '#444',
        },
      });