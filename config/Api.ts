const API: { [string: string]: string } = {
  USER_REGISTER: process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/register",
  USER_LOGIN: process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/login",
  USER_PROFILE: process.env.NEXT_PUBLIC_BASE_URL + "/api/user/profile",
};

export default API;
