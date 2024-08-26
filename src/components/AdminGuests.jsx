import { useContext, useState } from "react";

import { RefreshGuests } from "../context/RefreshGuests";

import normalizeText from "../lib/normalizeText";
import ShowGuests from "./ShowGuests";

export default function AdminGuests({ guests }) {
  const [search, setSearch] = useState(""); // para buscar por invitado

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  const newGuests = guests.filter((guest) =>
    normalizeText(guest.fullName).includes(normalizeText(search))
  );

  return (
    <div className="min-h-dvh">
      <div className="flex flex-col justify-center items-center gap-3">
        <label htmlFor="search" className="px-2 text-xl">
          Buscar invitado:
        </label>
        <input
          name="search"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Ingresa un nombre"
          className="border-2 rounded border-mainBG focus:outline-none px-2"
        />
      </div>
      <p className="text-2xl p-4">Selecciona un nombre: </p>
      <div className="flex flex-col gap-3 py-4 p-2 shadow-lg min-h-10 max-h-[85dvh] rounded-lg overflow-y-scroll">
        <ShowGuests
          guests={newGuests}
          onclick={() => {
            setOpen(true);
          }}
        />
      </div>
    </div>
  );
}
