import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formWrapper: {
    backgroundColor: 'white',
    width: '90%',
    maxWidth: 400,
    borderRadius: 8,
    padding: 24,
    ...Platform.select({
      android: {elevation: 4},
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 6,
    padding: 14,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  error: {
    color: '#dc2626',
    fontSize: 14,
    marginBottom: 8,
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 4,
  },
  navigationLinkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  navigationLinkText: {
    color: '#6b7280',
    fontSize: 14,
  },
  navigationLink: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
