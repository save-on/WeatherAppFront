// export const baseUrl = "http://localhost:3001";
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrexample.crabdance.com"
    : "http://localhost:3001";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function getItems() {
  return fetch(`${baseUrl}/clothing-items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
}

export function postItems(item, token) {
  return fetch(`${baseUrl}/clothing-items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(processServerResponse);
}

export function deleteItems(_id, token) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export const addCardLike = (_id, token) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const removeCardLike = (_id, token) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};
