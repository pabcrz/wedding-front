import { connection } from "../pages/api/data";
import { useState, useEffect, useMemo } from "react";
import { Toaster, toast } from "sonner";

import Modal from "./Modal";
import ModalConfirmation from "./ModalConfirmation";
import MyChart from "./Chart";

import normalizeText from "../lib/normalizeText";
import guestCategories from "../lib/filterGuest";
import { allGuestCategories, guestFilter } from "../lib/filterGuest";

export default function AdminGuests() {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState(""); // para buscar por invitado
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState("Todos");

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
        setLoading(false);
        setSelectedButton("Todos");
        return `Invitados disponibles...`;
      },
      error: "Error",
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      // Ejecutar la función automáticamente cuando los datos están cargados
      handleGuests(); // Llama a la función handleGuests para ejecutar automáticamente
    }
  }, [loading]);

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

  function handleGuests(filter = null) {
    const guestsData = guestFilter(guests, filter);
    const data = filter
      ? guestCategories(guests, filter)
      : allGuestCategories(guests);
    const chartData = {
      man: data.man.length,
      woman: data.woman.length,
      boys: data.boys.length,
      girls: data.boys.length,
    };
    // console.log(data);
    console.log(`Guests Data: ${guestsData}`);
    /*  chartData.total =
      chartData.man + chartData.woman + chartData.boys + chartData.girls;
    console.log("handleGuests ~ total:", chartData.total); */
    setGuestChart(chartData);
  }

  const getButtonClasses = (buttonType) =>
    `w-[80%] border rounded hover:bg-red-400 hover:text-white p-2 ${
      selectedButton === buttonType ? "bg-red-400 text-white" : ""
    }`;

  return (
    <>
      <Toaster richColors position="bottom-right" />

      <div className="grid grid-cols-[2fr_1fr] p-4 h-dvh">
        <div>
          <div className="flex items-center justify-center gap-3 py-4">
            <button
              className={getButtonClasses("Todos")}
              onMouseOver={() => {
                handleGuests();
                setSelectedButton("Todos");
              }}
            >
              Invitados
            </button>
            <button
              className={getButtonClasses("si")}
              onMouseOver={() => {
                handleGuests("si");
                setSelectedButton("si");
              }}
            >
              Invitados que si asistiran
            </button>
            <button
              className={getButtonClasses("no")}
              onMouseOver={() => {
                handleGuests("no");
                setSelectedButton("no");
              }}
            >
              Invitados que no asistiran
            </button>
            <button
              className={getButtonClasses("sin confirmar")}
              onMouseOver={() => {
                handleGuests("sin confirmar");
                setSelectedButton("sin confirmar");
              }}
            >
              Invitados sin confirmar
            </button>
          </div>
          {guestChart && <MyChart {...guestChart} />}
          {selectedButton === "Todos" && (
            <p>
              {selectedButton} los invitados: {guestChart.total}
            </p>
          )}
          {selectedButton === "sin confirmar" && (
            <p>
              Invitados {selectedButton}: {guestChart.total}
            </p>
          )}
          {selectedButton === "si" && (
            <p>
              Invitados que {selectedButton} asistiran: {guestChart.total}
            </p>
          )}
          {selectedButton === "no" && (
            <p>
              Invitados que {selectedButton} asistiran: {guestChart.total}
            </p>
          )}
          <ul></ul>
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
