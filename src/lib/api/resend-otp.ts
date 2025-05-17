import {axiosInstance} from '../axiosInstance';

type ResendOtpParams = {
  email: string;
};

export async function resendVerificationOtp({email}: ResendOtpParams) {
  const response = await axiosInstance.post('/auth/resend-verification-otp', {
    email,
  });

  return response.data;
}
