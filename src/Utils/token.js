const getToken = () => localStorage.getItem("jwt");

export const checkLoggedIn = () => {
  const jwt = getToken();
  if (!jwt) {
    return null;
  }
  return jwt;
};
