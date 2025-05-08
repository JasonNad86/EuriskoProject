import {useState} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {LoginFormData, loginSchema} from '../../schema/LoginSchema';
import {getLoginStyles} from './LoginScreenStyles';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import {AuthStackParams} from '../../types/NavigationStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faEyeSlash,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import CustomText from '../../components/CustomText/CustomText';
import {useTheme} from '../../context/ThemeContext';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const {login} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {isDark, toggleTheme} = useTheme();
  const styles = getLoginStyles(isDark);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = (data: LoginFormData) => {
    const isValid = login(data.email, data.password);
    if (isValid) {
      Toast.show({type: 'success', text1: 'Successfully Logged in'});
      navigation.navigate('Verification');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your credentials and try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <CustomText style={{marginRight: 8}}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </CustomText>
        <TouchableOpacity onPress={toggleTheme}>
          <FontAwesomeIcon
            icon={isDark ? faSun : faMoon}
            color={isDark ? 'orange' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.formWrapper}>
        <CustomText style={styles.title}>Login</CustomText>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <View style={styles.inputContainer}>
                <CustomText style={styles.label}>Email</CustomText>
                <TextInput
                  placeholder="you@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="off"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                />
              </View>
            )}
          />
          {errors.email && (
            <CustomText style={styles.error}>{errors.email.message}</CustomText>
          )}

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <View style={styles.inputContainer}>
                <CustomText style={styles.label}>Password</CustomText>
                <View style={styles.passwordInput}>
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    style={[styles.input, {flex: 1}]}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}>
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {errors.password && (
            <CustomText style={styles.error}>
              {errors.password.message}
            </CustomText>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleLogin)}>
            <CustomText style={styles.buttonText}>Log In</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationLinkContainer}
            onPress={() => navigation.navigate('SignUp')}>
            <CustomText style={styles.navigationLinkText}>
              Already have an account?{' '}
              <CustomText style={styles.navigationLink}>Sign up</CustomText>
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
