export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://travelwear-aa3b8a7cc158.herokuapp.com/"
    : "http://localhost:3001/";

export const processServerRequest = (url, options) => {
  return fetch(url, options).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

export function getItems() {
  return processServerRequest(`${baseUrl}clothing-items`);
}

export function postItems(item, token) {
  return processServerRequest(`${baseUrl}clothing-items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

export function postPackingList(packingList, token) {
  return processServerRequest(`${baseUrl}packing-lists`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(packingList),
  });
}

export function deleteItems(_id, token) {
  return processServerRequest(`${baseUrl}clothing-items/${_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export const addCardLike = (_id, token) => {
  return processServerRequest(`${baseUrl}clothing-items/${_id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (_id, token) => {
  return processServerRequest(`${baseUrl}clothing-items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
