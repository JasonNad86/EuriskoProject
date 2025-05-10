import {Platform, StyleSheet} from 'react-native';

export const getSignupStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#242424' : 'white',
      width: '90%',
      maxWidth: 400,
      borderRadius: 8,
      padding: 24,
      ...Platform.select({
        android: {elevation: 4},
        ios: {
          shadowColor: isDark ? '#ffffff' : '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: isDark ? 0.1 : 0.1,
          shadowRadius: 8,
        },
      }),
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#1f2937',
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
      color: isDark ? '#cccccc' : '#374151',
      marginBottom: 8,
      fontWeight: '500',
    },
    topButton: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#333',
    },
    input: {
      backgroundColor: isDark ? '#363636' : 'white',
      borderWidth: 1,
      borderColor: isDark ? '#555555' : '#d1d5db',
      borderRadius: 6,
      padding: 12,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#1f2937',
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
      backgroundColor: isDark ? '#2a1a1a' : '#fee2e2',
      padding: 8,
      borderRadius: 4,
    },
    navigationLinkContainer: {
      marginTop: 16,
      alignItems: 'center',
    },
    navigationLinkText: {
      color: isDark ? '#a0a0a0' : '#6b7280',
      fontSize: 14,
    },
    navigationLink: {
      color: '#2563eb',
      fontWeight: '600',
    },
    navbar: {
      alignItems: 'flex-end',
      padding: 8,
    },
  });
