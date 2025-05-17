import {useState} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {LoginFormData, loginSchema} from '../../schema/LoginSchema';
import {getLoginStyles} from './LoginScreenStyles';
import {useNavigation} from '@react-navigation/native';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QueryKeys} from '../../constants/QueryKeys';
import {userLogin} from '../../lib/api/user-login';
import {useAuthStore} from '../../store/AuthStore';

const LoginScreen = () => {
  const queryClient = useQueryClient();
  const {setTokens} = useAuthStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
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

  const loginUserMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: res => {
      const {accessToken, refreshToken} = res.data;
      setTokens(accessToken, refreshToken);
      Toast.show({type: 'success', text1: 'Successfully logged in'});
      queryClient.invalidateQueries({queryKey: [QueryKeys.USERS]});
    },
    onError: () => {
      Toast.show({type: 'error', text1: 'Failed to login.'});
    },
  });

  const handleLogin = (data: LoginFormData) => {
    loginUserMutation.mutate({
      email: data.email,
      password: data.password,
      token_expires_in: '1h',
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={toggleTheme}>
          <FontAwesomeIcon
            icon={isDark ? faSun : faMoon}
            color={isDark ? 'orange' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <CustomText style={styles.title}>Login</CustomText>
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, value}}) => (
                <View style={styles.inputContainer}>
                  <CustomText style={styles.label}>Email</CustomText>
                  <TextInput
                    placeholder="johndoe@example.com"
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
              <CustomText style={styles.error}>
                {errors.email.message}
              </CustomText>
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
    </SafeAreaView>
  );
};

export default LoginScreen;
