import AdminModal from "./AdminModal";
import { useState } from "react";

export default function ShowGuests({ guests }) {
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState({});
  function handleClick(elementGuest) {
    (e) => e.stopPropagation();
    setOpen(true);
    setGuest(elementGuest);
  }
  return (
    <>
      <div className="flex flex-wrap gap-1">
        {guests.map((elementGuest, i) => {
          return (
            <a
              href="#"
              key={i}
              onClick={() => handleClick(elementGuest)}
              className={`borderrounded-md px-3 p-1 w-[49%] border rounded-md hover:shadow-md
                       ${elementGuest.asistencia === "si" && "border-green-400"}
                      ${elementGuest.asistencia === "no" && "border-red-400"}`}
            >
              <p className="font-bold text-xl">
                {i + 1}.{elementGuest.fullName}
              </p>
              <p className="text-lg">Familia: {elementGuest.familia}</p>
              <p className="text-lg">Sexo: {elementGuest.sexo}</p>
              <p className="text-lg">Categoria: {elementGuest.categoria}</p>
              <p
                className={`text-lg
                ${elementGuest.asistencia === "si" && "text-green-600"} 
                ${elementGuest.asistencia === "no" && "text-red-500"}
                `}
              >
                Asistencia: {elementGuest.asistencia}
              </p>
            </a>
          );
        })}
      </div>
      <AdminModal
        open={open}
        onClose={() => setOpen(false)}
        guest={guest}
      ></AdminModal>
    </>
  );
}
