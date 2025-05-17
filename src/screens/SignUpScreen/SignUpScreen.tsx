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
import {useTheme} from '../../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createUser} from '../../lib/api/create-user';
import {QueryKeys} from '../../constants/QueryKeys';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../../store/AuthStore';

const SignUpScreen = () => {
  const {setSignupEmail} = useAuthStore();
  const queryClient = useQueryClient();
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (_,variables) => {
      setSignupEmail(variables.email)
      Toast.show({
        type: 'success',
        text1:
          'User created successfully. Please check your email for verification.',
      });
      queryClient.invalidateQueries({queryKey: [QueryKeys.USERS]});
      navigation.navigate('Verification');
    },
    onError: () => {
      Toast.show({type: 'error', text1: 'Failed to add user.'});
    },
  });

  const onSubmit = (data: SignupFormData) => {
    createUserMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    console.log("Data",data)
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
        <CustomText style={styles.title}>Sign Up</CustomText>
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="firstName"
              render={({field: {onChange, value}}) => (
                <View style={styles.inputContainer}>
                  <CustomText style={styles.label}>First Name</CustomText>
                  <TextInput
                    placeholder="John"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                    autoComplete="name-given"
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                  />
                </View>
              )}
            />
            {errors.firstName && (
              <CustomText style={styles.error}>
                {errors.firstName.message}
              </CustomText>
            )}

            <Controller
              control={control}
              name="lastName"
              render={({field: {onChange, value}}) => (
                <View style={styles.inputContainer}>
                  <CustomText style={styles.label}>Last Name</CustomText>
                  <TextInput
                    placeholder="Doe"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                    autoComplete="name-family"
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                  />
                </View>
              )}
            />
            {errors.lastName && (
              <CustomText style={styles.error}>
                {errors.lastName.message}
              </CustomText>
            )}

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
                    autoComplete="email"
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
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
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
    </SafeAreaView>
  );
};

export default SignUpScreen;
