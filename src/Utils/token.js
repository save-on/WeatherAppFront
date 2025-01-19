const getToken = () => localStorage.getItem("jwt");

export const checkLoggedIn = () => {
  const jwt = getToken();
  if (!jwt) {
    return;
  }
  return jwt;
};
