import { connection } from "./data";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function Guests() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    console.log("Cargando invitados...");
    connection()
      .then((data) => {
        console.log(data.data.guests);
        setGuests(data.data.guests);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al cargar los invitados");
      });
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <h1>Invitados</h1>
      {guests.map((guest) => {
        return (
          <div key={guest._id}>
            <h2>
              {guest.name} {guest.lastName}
            </h2>
            <p>Edad: {guest.age}</p>
          </div>
        );
      })}
    </>
  );
}
