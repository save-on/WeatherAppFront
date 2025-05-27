export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://travelwear-aa3b8a7cc158.herokuapp.com/"
    : "http://localhost:3001/";

export const processServerRequest = (url, options) => {
  return fetch(url, options).then(async (res) => {
    if (res.ok) return res.json();
    let errorMessage = `Error: ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (err) {
      console.error("Failed to parse response", err);
    }

    return Promise.reject({ message: errorMessage });
  });
};

//Clothing Items
export function getItems() {
  return processServerRequest(`${baseUrl}clothing-items`);
}

export function postItems(item, token) {
  return processServerRequest(`${baseUrl}clothing-items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: item,
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
export function getPackingLists(token) {
  return processServerRequest(`${baseUrl}profile/packing-lists`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getPackingListItems = async (packingListId, token) => {
  try {
    const res = await fetch(
      `${baseUrl}profile/packing-lists/${packingListId}/items`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const message = `Error: ${res.status}`;
      throw new Error(message);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching packing list items: ", error);
    throw error;
  }
};

export const postPackingList = async (formData, token) => {
  try {
    const res = await fetch(`${baseUrl}profile/packing-lists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${
          errorData.message || "Failed to create packing list"
        }`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error posting packing list:", error);
    throw error;
  }
};

export const postPackingListItem = async (
  packingListId,
  clothingItemIds,
  token
) => {
  if (!Array.isArray(clothingItemIds)) {
    console.error("Error: clothingItemIds must be an array.");
    throw new Error("clothingItemIds must be an array.");
  }

  if (clothingItemIds.length === 0) {
    console.warn(
      "Warning: clothingItemIds array is empty. No items will be added."
    );
    return;
  }

  try {
    const res = await fetch(
      `${baseUrl}profile/packing-lists/${packingListId}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clothing_item_ids: clothingItemIds }),
      }
    );

    if (!res.ok) {
      const message = `Error: ${res.status}`;
      throw new Error(message);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding items to packing list: ", error);
    throw error;
  }
};

export function deletePackingList(packingListId, token) {
  return processServerRequest(
    `${baseUrl}profile/packing-lists/${packingListId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const deletePackingListItem = async (packingListId, itemId, token) => {
  //const url = `${baseUrl}profile/packing-lists/${packingListId}/items/${itemId}`;
  const response = await fetch(
    `${baseUrl}profile/packing-lists/${packingListId}/items/${itemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete item from packing list");
  }
};

export function updatePackingList(packingListId, packingList, token) {
  return processServerRequest(
    `${baseUrl}profile/packing-lists/${packingListId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(packingList),
    }
  );
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

export const getCityLocationData = (location) => {
  return processServerRequest(`${baseUrl}weather`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(location),
  });
};

export const sendPackingListEmail = async (dataToSend, token) => {
  try {
    const res = await fetch(`${baseUrl}packing-lists/send-packing-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) {
      const errorText = await res.text();
      let errorMessage = `HTTP error! status: ${res.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (error) {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return await res.json();
  } catch (error) {
    console.error("Error sending packing list email: ", error);
    throw error;
  }
};

export const postTripWithPackinglist = async (tripData, token) => {
  try {
    const res = await fetch(`${baseUrl}trips`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tripData),
    });

    if (!res.ok) {
      // If the response is not OK (e.g., 4xx or 5xx),
      // try to parse the error message from the backend.
      let errorMessage = `HTTP error! status: ${res.status}`;
      try {
        const errorData = await res.json(); // Backend sends JSON errors
        errorMessage = errorData.message || errorMessage;
      } catch (err) {
        // Fallback if the error response itself isn't JSON
        const errorText = await res.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // If the response is OK, parse the successful JSON data
    return await res.json();
  } catch (error) {
    console.error("Error posting trip with packing list: ", error);
    throw error;
  }
};

export const getTrips = (token) => {
  return processServerRequest(`${baseUrl}trips`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTripById = (tripId, token) => {
  if (!tripId) {
    return Promise.reject(
      new Error("Trip ID is required to fetch a single trip.")
    );
  }
  if (!token) {
    return Promise.reject(
      new Error("Authentication token not found. Please log in.")
    );
  }

  return processServerRequest(`${baseUrl}trips/${tripId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTrip = (tripId, token) => {
  if (!tripId) {
    return Promise.reject(new Error("Trip ID is required for deletion."));
  }
  if (!token) {
    return Promise.reject(
      new Error("Authentication token not found. Please log in.")
    );
  }

  return processServerRequest(`${baseUrl}trips/${tripId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrip = async (tripId, tripData, token) => {
  try {
    const res = await fetch(`${baseUrl}trips/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tripData),
    });

    if (!res.ok) {
      let errorMessage = `HTTP error! status: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (error) {
        // Fallback if the error response itself isn't JSON
        const errorText = await res.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    // If the response is OK, parse the successful JSON data
    return await res.json();
  } catch (error) {
    console.error("Error updating trip:", error);
    throw error;
  }
};
