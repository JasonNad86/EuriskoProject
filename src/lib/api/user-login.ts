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
    ...(token_expires_in && {token_expires_in}),
  };
  const response = await axiosInstance.post('/auth/login', {
    payload,
  });
  return response.data;
}
