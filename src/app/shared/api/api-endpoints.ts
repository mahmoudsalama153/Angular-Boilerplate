import { environment } from "../../../environments/environment";

const baseUrl = environment.baseUrl;

const Dashboard = "Dashboard";
const Auth = "Auth";

export const API_ENDPOINTS = {
  baseUrl: baseUrl,
  dashboard: {
    getDashboardData: `${Dashboard}/get-dashboard-data`,
  },
  auth: {
    investorLogin: `${Auth}/investor-login`,
    windowsLogin: `${Auth}/WinLogin`, //production
    fakeWindowsLogin: `${Auth}/login`,
    refreshToken: `${Auth}/refresh-token`,
    register: `${Auth}/register-investor`,
    resetPassword: `${Auth}/reset-password`,
    passwordResetTokenExpiry: `${Auth}/password-reset-token-expiry`,
    forgotPassword: `${Auth}/forget-password`,
    verifyEmail: `${Auth}/verify-email`,
    resendVerifyEmail: `${Auth}/resend-verification-email`,
    getUserProfile: `${Auth}/profile`,
    loginWithImpersonation: `${Auth}/LoginWithImpersonation`,
    winLoginWithImpersonation: `${Auth}/WinLoginWithImpersonation`,
  },
};
