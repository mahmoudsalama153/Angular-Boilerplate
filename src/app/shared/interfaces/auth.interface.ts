export interface IAuthData {
  token: string;
  refreshToken: string;
  userId: string;
  userName: string;
  nameAR: string;
  nameEN: string;
  isEmailVerified: boolean;
  errorMessage: string;
  roleIds: string[];
  roleNames: string[];
  expiresAt: string;
  refreshTokenExpiresAt: string;
}

export interface IRegisterRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
