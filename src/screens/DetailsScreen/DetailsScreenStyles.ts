import { StyleSheet } from "react-native";

export const getDetailsStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : 'white',
    paddingTop: 8,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 16,
  },
  iconButton: {
    padding: 4,
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
    color: isDark ? '#ffffff' : '#1a1a1a',
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: isDark ? '#a0a0a0' : '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: isDark ? '#cccccc' : '#444',
  },
});