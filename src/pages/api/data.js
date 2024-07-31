const API_URL = "https://wedding-backend-zsdc.onrender.com";

export function connection() {
  return fetch(`${API_URL}/guests`)
    .then((res) => res.json())
    .then((data) => data);
}

export function addGuest(guest) {
  return fetch(`${API_URL}/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: guest.name,
      lastName: guest.lastName,
      gender: guest.gender,
      age: guest.age,
      family: guest.family,
    }),
  });
}

export function updateGuest(guest) {
  return fetch(`${API_URL}/guests/${guest.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: guest.name,
      lastName: guest.lastName,
    }),
  });
}
