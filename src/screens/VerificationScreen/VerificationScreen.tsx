import {Button, TextInput, View} from 'react-native';
import {getVerificationStyles} from './VerificationScreenStyles';
import {Controller, useForm} from 'react-hook-form';
import {
  VerificationFormData,
  verificationSchema,
} from '../../schema/VerificationSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomText from '../../components/CustomText/CustomText';
import {useTheme} from '../../context/ThemeContext';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../../store/AuthStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QueryKeys} from '../../constants/QueryKeys';
import {verifyOtp} from '../../lib/api/verify-otp';
import {resendVerificationOtp} from '../../lib/api/resend-otp';
import {Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../../types/NavigationStack';

const VerificationScreen = () => {
  const queryClient = useQueryClient();
  const navigation =
      useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const {signupEmail} = useAuthStore();
  const {isDark} = useTheme();
  const styles = getVerificationStyles(isDark);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: '',
    },
  });
  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      Toast.show({type: 'success', text1: 'Verification Successful'});
      queryClient.invalidateQueries({queryKey: [QueryKeys.OTP]});
      navigation.navigate('Login')
    },
    onError: () => {
      Toast.show({type: 'error', text1: 'Verification Failed.'});
    },
  });
  const onSubmit = async (data: VerificationFormData) => {
    if (!signupEmail) {
      Toast.show({type: 'error', text1: 'Missing email for verification'});
      return;
    }
    verifyOtpMutation.mutate({
      email: signupEmail,
      otp: data.otp,
    });
  };

  const resendOtpMutation = useMutation({
    mutationFn: resendVerificationOtp,
    onSuccess: () => {
      Toast.show({type: 'success', text1: 'Verification code resent'});
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Failed to resend code. Please try again',
      });
    },
  });

  const handleResendOtp = () => {
  if (!signupEmail) {
    Toast.show({ type: 'error', text1: 'Missing email to resend code' });
    return;
  }
  resendOtpMutation.mutate({ email: signupEmail });
};


  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>Enter the 6-digit code</CustomText>

      <Controller
        control={control}
        name="otp"
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />
        )}
      />

      {errors.otp && (
        <CustomText style={styles.error}>{errors.otp.message}</CustomText>
      )}

      <Button title="Confirm" onPress={handleSubmit(onSubmit)} />
      <Pressable
        onPress={handleResendOtp}>
        <CustomText style={styles.resendText}>
          Didn't receive the code?{' '}
          <CustomText style={styles.resendLink}>Resend</CustomText>
        </CustomText>
      </Pressable>
    </View>
  );
};

export default VerificationScreen;
