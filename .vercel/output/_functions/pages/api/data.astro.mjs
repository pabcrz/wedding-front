export { renderers } from '../../renderers.mjs';

const API_URL = "https://wedding-backend-zsdc.onrender.com";

function connection() {
  return fetch(`${API_URL}/guests`)
    .then((res) => res.json())
    .then((data) => data);
}

function addGuest(guest) {
  return fetch(`${API_URL}/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guest),
  });
}

// para confimar asistencia
function confirmGuest(guest) {
  return fetch(`${API_URL}/guests/${guest._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      asistencia: guest.asistencia,
    }),
  });
}

function updateGuest(guest) {
  return fetch(`${API_URL}/guests/${guest._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guest),
  });
}

function deleteGuest(guestId) {
  return fetch(`${API_URL}/guests/${guestId}`, {
    method: "DELETE",
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  addGuest,
  confirmGuest,
  connection,
  deleteGuest,
  updateGuest
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
