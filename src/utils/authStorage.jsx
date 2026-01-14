const TOKEN_KEY = "auth_token";
const USER_ID_KEY = "user_id";

export const setAuth = ({ token, userId }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, userId);
};

export const getAuth = () => ({
  token: localStorage.getItem(TOKEN_KEY),
  userId: localStorage.getItem(USER_ID_KEY),
});

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};
