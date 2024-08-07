import { connection } from "../pages/api/data";
import { useState, useEffect, useMemo } from "react";
import { Toaster, toast } from "sonner";

import Modal from "./Modal";
import ModalConfirmation from "./ModalConfirmation";
import MyChart from "./Chart";

import normalizeText from "../lib/normalizeText";
import guestCategories from "../lib/filterGuest";
import { allGuestCategories } from "../lib/filterGuest";

export default function AdminGuests() {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState(""); // para buscar por invitado
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [guestChart, setGuestChart] = useState({
    man: 0,
    woman: 0,
    boys: 0,
    girls: 0,
  });

  useEffect(() => {
    toast.promise(connection(), {
      loading: "Cargando invitados...",
      success: (data) => {
        setGuests(data.data.guests);
        console.log(data.data.guests);
        return `Invitados disponibles...`;
      },
      error: "Error",
    });
  }, []);

  const initialChartData = allGuestCategories(guests);
  // console.log("initialChartData:", initialChartData);

  const newGuests = guests.filter((guest) =>
    normalizeText(guest.fullName).includes(normalizeText(search))
  );

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleClick(elementGuest) {
    (e) => e.stopPropagation();
    setOpen(true);
    setGuest(elementGuest);
  }

  function HandleGuests() {
    const chartData = allGuestCategories(guests);
    const data = {
      man: chartData.man.length,
      woman: chartData.woman.length,
      boys: chartData.boys.length,
      girls: chartData.boys.length,
    };
    console.log(data);
    return setGuestChart(data);
  }

  function HandleGuestsYes() {
    const chartData = guestCategories(guests, "si");
    const data = {
      man: chartData.man.length,
      woman: chartData.woman.length,
      boys: chartData.boys.length,
      girls: chartData.boys.length,
    };
    setGuestChart(data);
    console.log(data);
  }

  function HandleGuestsNo() {
    const chartData = guestCategories(guests, "no");
    const data = {
      man: chartData.man.length,
      woman: chartData.woman.length,
      boys: chartData.boys.length,
      girls: chartData.boys.length,
    };
    setGuestChart(data);
    console.log(data);
  }

  function HandleGuestsSin() {
    const chartData = guestCategories(guests, "sin confirmar");
    const data = {
      man: chartData.man.length,
      woman: chartData.woman.length,
      boys: chartData.boys.length,
      girls: chartData.boys.length,
    };
    setGuestChart(data);
    console.log(guestChart);
  }
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <div className="grid grid-cols-[200px_2fr_1fr] p-4 h-dvh">
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            className="w-[80%] border hover:bg-red-400 rounded hover:text-white"
            onClick={HandleGuests}
          >
            Invitados
          </button>
          <button
            className="w-[80%] border hover:bg-red-400 rounded hover:text-white"
            onClick={HandleGuestsYes}
          >
            Invitados que asistiran
          </button>
          <button
            className="w-[80%] border hover:bg-red-400 rounded hover:text-white"
            onClick={HandleGuestsNo}
          >
            Invitados que no asistiran
          </button>
          <button
            className="w-[80%] border hover:bg-red-400 rounded hover:text-white"
            onClick={HandleGuestsSin}
          >
            Invitados que sin confirmar
          </button>
        </div>
        <div>
          <p>Graficos</p>
          {guestChart && <MyChart {...guestChart} />}
        </div>
        <div className="max-h-dvh overflow-y-scroll">
          <div className="flex flex-col justify-center items-center gap-3">
            <label htmlFor="searhc" className="px-2 text-xl">
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
          <div className="flex flex-col gap-3 py-4 p-2 shadow-lg min-h-10 rounded-lg overflow-auto">
            {search &&
              search.length >= 3 &&
              newGuests.map((elementGuest, i) => {
                return (
                  <a
                    href="#"
                    key={i}
                    onClick={() => handleClick(elementGuest)}
                    className={`
                     border rounded-md px-3 hover:shadow-md
                       ${elementGuest.asistencia === "si" && "border-green-400"}
                      ${elementGuest.asistencia === "no" && "border-red-400"}
                    `}
                  >
                    <p className="font-bold text-xl">{elementGuest.fullName}</p>
                    <p className="text-lg">
                      Asistencia: {elementGuest.asistencia}
                    </p>
                    <p className="text-lg">Familia: {elementGuest.familia}</p>
                    <p className="text-lg">Sexo: {elementGuest.sexo}</p>
                    <p className="text-lg">
                      Categoria: {elementGuest.categoria}
                    </p>
                  </a>
                );
              })}
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              guest={guest}
              onConfirm={() => {
                setConfirmation(true);
              }}
            ></Modal>

            <ModalConfirmation
              open={confirmation}
              onClose={() => setConfirmation(false)}
              guest={guest}
            ></ModalConfirmation>
          </div>
        </div>
      </div>
    </>
  );
}
