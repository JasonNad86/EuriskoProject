import {axiosInstance} from '../axiosInstance';

type OtpParams = {
  email: string;
  otp: string;
};

export async function verifyOtp({email, otp}: OtpParams) {
  const response = await axiosInstance.post('/auth/verify-otp', {
    email,
    otp,
  });

  return response.data;
}
