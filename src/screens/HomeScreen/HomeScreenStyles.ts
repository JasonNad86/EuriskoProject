import { StyleSheet } from 'react-native';

export const getHomeStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#000000' : '#f5f5f5',
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  topButton: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? '#ffffff' : '#333',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    backgroundColor: isDark ? '#ff4444' : 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});