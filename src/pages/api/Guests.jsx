import { connection } from "./data";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import Modal from "../../components/Modal";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [asistencia, setAsistencia] = useState("");

  useEffect(() => {
    toast.promise(connection(), {
      loading: "Cargando invitados...",
      success: (data) => {
        return `Invitados disponibles...`;
      },
      error: "Error",
    });

    connection()
      .then((data) => {
        data.data.guests.map(
          (guest) => (guest.fullName = `${guest.Nombre} ${guest.Apellido}`)
        );
        setGuests(data.data.guests);
        console.log(data.data.guests);
        // toast.success("Invitados disponibles.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al cargar los invitados.");
      });
  }, []);

  const newGuests = guests.filter(
    (guest) => normalizeName(guest.fullName).includes(normalizeName(search))
    // guest.fullName.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function normalizeName(name) {
    // Convertir a minúsculas
    let lowerCaseName = name.toLowerCase();

    // Eliminar acentos
    let normalized = lowerCaseName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return normalized;
  }

  function handleClick(elementGuest) {
    (e) => e.stopPropagation();
    setOpen(true);
    setGuest(elementGuest);
  }

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <div className="max-w-[1200px] flex flex-col md:flex-row justify-center items-center gap-3">
        <label htmlFor="searhc" className="px-2 text-xl">
          Ingresa tu nombre:
        </label>
        <input
          name="search"
          type="text"
          value={search}
          onChange={handleSearch}
          className="border-2 rounded border-mainBG focus:outline-none px-2"
        />
      </div>
      <p className="text-2xl py-4">Selecciona tu nombre: </p>
      <div className="flex flex-wrap gap-3 py-4 p-2 shadow-lg min-h-10">
        {search &&
          search.length >= 1 &&
          newGuests.map((elementGuest, i) => {
            return (
              <a
                href="#"
                key={i}
                onClick={() => handleClick(elementGuest)}
                className=" border border-mainBG hover:border-mainFont rounded px-3 hover:text-mainFont p-1 "
              >
                <p className="font-bold text-xl">{elementGuest.fullName}</p>
              </a>
            );
          })}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          guest={guest}
          onConfirm={() => setConfirmation(true)}
        ></Modal>

        <ModalConfirmation
          open={confirmation}
          onClose={() => setConfirmation(false)}
          guest={guest}
        ></ModalConfirmation>
      </div>
    </>
  );
}
