const getToken = () => localStorage.getItem("jwt");
export const removeToken = () => localStorage.removeItem("jwt");
export const setToken = (token) => localStorage.setItem("jwt", token);
export const setTempUnit = (temp) => localStorage.setItem("temp", temp);
export const getTempUnit = () => localStorage.getItem("temp");

export const checkLoggedIn = () => {
  const jwt = getToken();
  if (!jwt) {
    return null;
  }
  return jwt;
};
