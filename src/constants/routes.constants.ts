export const RoutesConstants = {
  BASE_URL: "/v1",
  AUTH: {
    DEFAULT: "/auth",
    LOGIN: "/login",
    LOGOUT: "/logout",
    SIGNUP: "/signup",
    ME: "/me",
    FORGOT_PASSWORD: "/forgotPassword",
    RESET_PASSWORD: "/resetPassword/:resetToken",
  },
  USER: {
    DEFAULT: "/users",
    ALL: "/",
    DETAIL: "/:id",
  },
  TOPICS: {
    DEFAULT: "/topics",
  },
  HEALTH: "/health",
  NOT_FOUND: "*",
};
