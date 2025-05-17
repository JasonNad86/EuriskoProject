import {axiosInstance} from '../axiosInstance';

type RefreshTokenParams = {
  refreshToken: string;
  token_expires_in?: string;
};

export async function refreshToken({
  refreshToken,
  token_expires_in,
}: RefreshTokenParams) {
  const payload = {
    refreshToken,
    ...(token_expires_in && {token_expires_in}),
  };
  const response = await axiosInstance.post('/auth/refresh-token', payload);
  return response.data;
}
