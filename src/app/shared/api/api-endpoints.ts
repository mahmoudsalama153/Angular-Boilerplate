import { environment } from '../../../envirnments/environment.prod';

const baseUrl = environment.baseUrl;
const Auth = 'Auth';

export const API_ENDPOINTS = {
  baseUrl: baseUrl,
  auth: {
    login: `${Auth}/login`,
    refreshToken: `${Auth}/refresh-token`,
    register: `${Auth}/register`,
    resetPassword: `${Auth}/reset-password`,
    passwordResetTokenExpiry: `${Auth}/password-reset-token-expiry`,
    forgotPassword: `${Auth}/forget-password`,
    verifyEmail: `${Auth}/verify-email`,
    resendVerifyEmail: `${Auth}/resend-verification-email`,
    getUserProfile: `${Auth}/profile`,
  },
};
