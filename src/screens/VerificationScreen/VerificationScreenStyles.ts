import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '50%',
    textAlign: 'center',
    borderRadius: 8,
  },
  error: {
    color: '#dc2626',
    fontSize: 14,
    marginBottom: 8,
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 4,
  },
});
