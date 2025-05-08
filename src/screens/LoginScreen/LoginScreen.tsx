import {useState} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {LoginFormData, loginSchema} from '../../schema/LoginSchema';
import {styles} from './LoginScreenStyles';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import { AuthStackParams } from '../../types/NavigationStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomText from '../../components/CustomText';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const {login} = useAuth();
  const [showPassword, setShowPassword] = useState(false);

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
      navigation.navigate('Verification');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
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
                  autoCapitalize='none'
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
                    autoCapitalize='none'
                    value={value}
                    onChangeText={onChange}
                    style={[styles.input, {flex: 1}]}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}>
                    <Icon
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={18}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {errors.password && (
            <CustomText style={styles.error}>{errors.password.message}</CustomText>
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
              Already have an account? {' '}
              <CustomText style={styles.navigationLink}>Sign up</CustomText>
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
