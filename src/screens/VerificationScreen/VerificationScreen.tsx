import {Button, TextInput, View} from 'react-native';
import {getVerificationStyles} from './VerificationScreenStyles';
import {useAuth} from '../../context/AuthContext';
import {Controller, useForm} from 'react-hook-form';
import {
  VerificationFormData,
  verificationSchema,
} from '../../schema/VerificationSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomText from '../../components/CustomText/CustomText';
import { useTheme } from '../../context/ThemeContext';
import Toast from 'react-native-toast-message';

const VerificationScreen = () => {
  const {verifyOtp} = useAuth();
  const {isDark} = useTheme();
  const styles = getVerificationStyles(isDark)

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: '',
    },
  });

  const onSubmit = async (data: VerificationFormData) => {
    const isValid = await verifyOtp(data.verificationCode);
    if (isValid) {
      Toast.show({
        type: 'success',
        text1: 'Verification Successful',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: 'The code you entered is incorrect',
      });
    }
    };
  

  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>Enter the 4-digit code</CustomText>

      <Controller
        control={control}
        name="verificationCode"
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            maxLength={4}
            autoFocus
          />
        )}
      />

      {errors.verificationCode && (
        <CustomText style={styles.error}>
          {errors.verificationCode.message}
        </CustomText>
      )}

      <Button title="Confirm" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default VerificationScreen;
