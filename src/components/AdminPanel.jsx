import { connection } from "../pages/api/data";
import { useState, useEffect, useMemo } from "react";
import { Toaster, toast } from "sonner";

import MyChart from "./Chart";
import AdminGuests from "./AdminGuests";
import ShowGuests from "./ShowGuests";

import { categories, guestFiltered } from "../lib/filterGuest";

export default function AdminPanel() {
  const [guests, setGuests] = useState([]);
  const [guestsFiltered, setGuestsFiltered] = useState([]);

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

  const initialChartData = categories(guests);
  // console.log("initialChartData:", initialChartData);

  function handleGuests(asistencia = null) {
    const data = guestFiltered(guests, asistencia);
    const chartData = {
      man: data.man.length,
      woman: data.woman.length,
      boys: data.boys.length,
      girls: data.boys.length,
    };
    console.log(data.guestsAsist);
    setGuestsFiltered(data.guestsAsist);
    setGuestChart(chartData);
  }

  const getButtonClasses = (buttonType) =>
    `w-[80%] border rounded hover:bg-red-400 hover:text-white p-1 ${
      selectedButton === buttonType ? "bg-red-400 text-white" : ""
    }`;

  return (
    <>
      <Toaster richColors position="bottom-right" />

      <div className="flex flex-col justify-center p-4 min-w-full">
        <p>Aqui puedes ver los invitados: </p>
        <div className="flex">
          <div className="flex flex-col items-center justify-center gap-3 py-4 w-80">
            <button
              className={getButtonClasses("Todos")}
              onMouseOver={() => {
                handleGuests();
                setSelectedButton("Todos");
              }}
            >
              Totales
            </button>
            <button
              className={getButtonClasses("si")}
              onMouseOver={() => {
                handleGuests("si");
                setSelectedButton("si");
              }}
            >
              Que si asistiran
            </button>
            <button
              className={getButtonClasses("no")}
              onMouseOver={() => {
                handleGuests("no");
                setSelectedButton("no");
              }}
            >
              Que no asistiran
            </button>
            <button
              className={getButtonClasses("sin confirmar")}
              onMouseOver={() => {
                handleGuests("sin confirmar");
                setSelectedButton("sin confirmar");
              }}
            >
              Sin confirmar
            </button>
          </div>
          {guestChart && <MyChart {...guestChart} />}
        </div>

        {selectedButton === "Todos" && (
          <>
            <p>
              {selectedButton} los invitados: {guestsFiltered.length}
            </p>
          </>
        )}

        {selectedButton === "sin confirmar" && (
          <>
            <p>
              Invitados {selectedButton}: {guestsFiltered.length}
            </p>
          </>
        )}

        {selectedButton === "si" && (
          <>
            <p>
              Invitados que {selectedButton} asistiran: {guestFiltered.length}
            </p>
          </>
        )}

        {selectedButton === "no" && (
          <>
            <p>
              Invitados que {selectedButton} asistiran: {guestsFiltered.length}
            </p>
          </>
        )}
      </div>
      <AdminGuests guests={guestsFiltered} />
    </>
  );
}
