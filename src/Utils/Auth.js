import { processServerRequest } from "./Api.js";
import { baseUrl } from "./Api.js";

export const register = ({ name, avatar, email, password }) => {
  return processServerRequest(`${baseUrl}users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const login = ({ email, password }) => {
  return processServerRequest(`${baseUrl}users/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
     
    },
    body: JSON.stringify({ email, password }),
  });
};

export const update = ({ name, avatar }, token) => {
  return processServerRequest(`${baseUrl}users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export const getUserData = (token) => {
  return processServerRequest(`${baseUrl}users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
