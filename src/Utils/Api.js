export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://travelwear-aa3b8a7cc158.herokuapp.com/"
    : "http://localhost:3001/";

export const processServerRequest = (url, options) => {
  return fetch(url, options).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

//Clothing Items
export function getItems() {
  return processServerRequest(`${baseUrl}clothing-items`);
}

// export function postItems(item, token) {
//   return processServerRequest(`${baseUrl}clothing-items`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(item),
//   });
// }

export function postItems(item, imageFile, token) {
  console.log("Token from storge:", localStorage.getItem("jwt"));
  console.log("Token format check:", token.split(".").length);
  console.log("Token being sent", token);
  const formData = new FormData();

  for (const key in item) {
    formData.append(key, item[key]);
  }
  
  formData.append('image', imageFile);

  return processServerRequest(`${baseUrl}clothing-items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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

//Packing Lists
export function getPackingLists() {
  return processServerRequest(`${baseUrl}profile/packing-lists`);
}
export function postPackingList(packingList, token) {
  return processServerRequest(`${baseUrl}profile/packing-lists`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(packingList),
  });
}

//Card Likes

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
