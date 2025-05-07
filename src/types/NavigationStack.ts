import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParams = {
  Main: NavigatorScreenParams<MainStackParams>;
  Auth: NavigatorScreenParams<AuthStackParams>;
};

export type MainStackParams = {
  Home: undefined;
  Details: {
    productId: string;
  };
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  Verification: undefined;
};
