import {axiosInstance} from '../axiosInstance';

type LoginUserParams = {
  email: string;
  password: string;
  token_expires_in?: string;
};

export async function userLogin({
  email,
  password,
  token_expires_in,
}: LoginUserParams) {
  const payload = {
    email,
    password,
    ...(token_expires_in && { token_expires_in }),
  };

  console.log('📤 [LOGIN] Payload:', payload);

  try {
    const response = await axiosInstance.post('/auth/login', payload);
    console.log('✅ [LOGIN] Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.log('❌ [LOGIN] Error:', error?.response?.data || error.message);
    throw error;
  }
}
