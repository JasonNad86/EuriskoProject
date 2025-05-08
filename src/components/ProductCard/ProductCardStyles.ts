import { Platform, StyleSheet } from 'react-native';

export const getProductCardStyles = (isDark: boolean) => StyleSheet.create({
  card: {
    backgroundColor: isDark ? '#242424' : 'white',
    borderRadius: 10,
    margin: 8,
    padding: 12,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: isDark ? '#ffffff' : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.1 : 0.1,
        shadowRadius: 4,
      },
    }),
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  textContainer: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: isDark ? '#ffffff' : '#1a1a1a',
  },
  price: {
    fontSize: 14,
    color: isDark ? '#a0a0a0' : '#666',
    fontWeight: '500',
  },
});