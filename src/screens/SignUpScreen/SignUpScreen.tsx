import React, {useState} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {SignupFormData, signupSchema} from '../../schema/SignUpSchema';
import {getSignupStyles} from './SignUpScreenStyles';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {AuthStackParams} from '../../types/NavigationStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {faEyeSlash, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import CustomText from '../../components/CustomText/CustomText';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { useTheme } from '../../context/ThemeContext';

const SignUpScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [showPassword, setShowPassword] = useState(false);
    const {isDark, toggleTheme} = useTheme();
    const styles = getSignupStyles(isDark);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup Data:', data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <TouchableOpacity onPress={toggleTheme}>
          <View style={{flexDirection:'row'}}>
          <CustomText style={[styles.topButton, { marginRight: 8 }]}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </CustomText>
          <FontAwesomeIcon
            icon={isDark ? faSun : faMoon}
            color={isDark ? 'orange' : 'black'}
          />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.formWrapper}>
        <CustomText style={styles.title}>Sign Up</CustomText>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, value}}) => (
              <View style={styles.inputContainer}>
                <CustomText style={styles.label}>Full Name</CustomText>
                <TextInput
                  placeholder="John Doe"
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                />
              </View>
            )}
          />
          {errors.name && (
            <CustomText style={styles.error}>{errors.name.message}</CustomText>
          )}

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

          <Controller
            control={control}
            name="phoneNumber"
            render={({field: {onChange, value}}) => (
              <View style={styles.inputContainer}>
                <CustomText style={styles.label}>Phone Number</CustomText>
                <TextInput
                  placeholder="123-456-7890"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                />
              </View>
            )}
          />
          {errors.phoneNumber && (
            <CustomText style={styles.error}>
              {errors.phoneNumber.message}
            </CustomText>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <CustomText style={styles.buttonText}>Sign Up</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigationLinkContainer}
            onPress={() => navigation.navigate('Login')}>
            <CustomText style={styles.navigationLinkText}>
              Already have an account?{' '}
              <CustomText style={styles.navigationLink}>Login</CustomText>
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
