import { StyleSheet } from 'react-native';

export const getVerificationStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: isDark ? '#121212' : 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: isDark ? '#ffffff' : '#1a1a1a',
  },
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: isDark ? '#555555' : '#ccc',
    padding: 10,
    marginBottom: 5,
    width: '50%',
    textAlign: 'center',
    borderRadius: 8,
    color: isDark ? '#ffffff' : '#1a1a1a',
    backgroundColor: isDark ? '#242424' : 'white',
  },
  error: {
    color: '#dc2626',
    fontSize: 14,
    marginBottom: 8,
    backgroundColor: isDark ? '#2a1a1a' : '#fee2e2',
    padding: 8,
    borderRadius: 4,
  },
});