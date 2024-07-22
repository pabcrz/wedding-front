import { connection } from "./data";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function Guests() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    toast.message("Cargando invitados...");
    connection()
      .then((data) => {
        console.log(data.data.guests);
        setGuests(data.data.guests);
        toast.success("Invitados disponibles.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al cargar los invitados.");
      });
  }, []);

  function handleClick() {
    console.log("Buscando...");
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="max-w-[1200px] flex justify-center">
        <input type="text" className="" placeholder="Ingresa tu nombre:" />
        <button
          onClick={handleClick}
          className="hover:text-white hover:bg-mainFont border border-mainFont p-2 rounded font-bold  "
        >
          Buscar
        </button>
      </div>
      <h1>Coincidencias encontradas: </h1>
      <div className="flex flex-col gap-3">
        {guests.map((guest) => {
          return (
            <div key={guest._id} className="shadow p-2">
              <h2>
                {guest.Nombre} {guest.Apellido}
              </h2>
              <p>Estas en la familia: {guest.Familia}</p>
              <p>Tu categoria es: {guest.Categoria}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
