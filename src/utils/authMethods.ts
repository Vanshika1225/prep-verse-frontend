export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const getUser = (): Record<string, unknown> | null => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
export const clearAuth = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const saveAuth = (response: { data: { accessToken: string } }) => {
  setAccessToken(response.data.accessToken);
};
