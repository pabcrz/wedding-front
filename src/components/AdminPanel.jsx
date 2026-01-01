import { connection } from "../lib/api";
import { useState, useEffect, useContext, createContext } from "react";
import { Toaster, toast } from "sonner";

import MyChart from "./Chart";
import AdminGuests from "./AdminGuests";
import { RefreshGuests } from "../context/RefreshGuests";

import { filterGuests } from "../lib/filterGuest";

export default function AdminPanel() {
  const [refreshGuests, setRefreshGuests] = useState(false);

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
        setLoading(false);
        const dataGuests = filterGuests(data.data.guests);
        setGuestsFiltered(dataGuests.guestsAsist);
        setSelectedButton("Todos");
        return `Invitados disponibles...`;
      },
      error: "Error",
    });
  }, [refreshGuests]);

  useEffect(() => {
    if (!loading) {
      // Ejecutar la función automáticamente cuando los datos están cargados
      handleGuests(); // Llama a la función handleGuests para ejecutar automáticamente
    }
  }, [loading]);

  function handleGuests(asistencia) {
    const data = filterGuests(guests, asistencia);
    const chartData = {
      man: data.man.length,
      woman: data.woman.length,
      boys: data.boys.length,
      girls: data.boys.length,
    };
    setGuestsFiltered(data.guestsAsist);
    console.log(data.guestsAsist);
    setGuestChart(chartData);
    guestsFiltered;
  }

  const getButtonClasses = (buttonType) =>
    `w-[80%] border rounded hover:bg-red-400 hover:text-white p-1 ${
      selectedButton === buttonType ? "bg-red-400 text-white" : ""
    }`;

  const GuestInfo = ({ guestChart }) => (
    <div className="flex gap-3">
      <p className="text-lg">
        Mujeres: <strong>{guestChart.woman}</strong>
      </p>
      <p className="text-lg">
        Hombres: <strong>{guestChart.man}</strong>
      </p>
      <p className="text-lg">
        Niñas: <strong>{guestChart.girls}</strong>
      </p>
      <p className="text-lg">
        Niños: <strong>{guestChart.boys}</strong>
      </p>
    </div>
  );

  return (
    <>
      <Toaster richColors position="bottom-right" />

      <RefreshGuests.Provider value={{ refreshGuests, setRefreshGuests }}>
        <div className="flex flex-col justify-center p-4 min-w-full">
          <p>Aqui puedes ver los invitados: </p>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center gap-3 py-4 w-80">
              <button
                className={getButtonClasses("Todos")}
                onClick={() => {
                  handleGuests();
                  setSelectedButton("Todos");
                }}
              >
                Totales
              </button>
              <button
                className={getButtonClasses("si")}
                onClick={() => {
                  handleGuests("si");
                  setSelectedButton("si");
                }}
              >
                Que si asistiran
              </button>
              <button
                className={getButtonClasses("no")}
                onClick={() => {
                  handleGuests("no");
                  setSelectedButton("no");
                }}
              >
                Que no asistiran
              </button>
              <button
                className={getButtonClasses("sin confirmar")}
                onClick={() => {
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
                {selectedButton} los invitados:{" "}
                <strong>{guestsFiltered.length} </strong>
              </p>
              <GuestInfo guestChart={guestChart} />
            </>
          )}

          {selectedButton === "sin confirmar" && (
            <>
              <p>
                Invitados {selectedButton}: {guestsFiltered.length}
              </p>
              <GuestInfo guestChart={guestChart} />
            </>
          )}

          {selectedButton === "si" && (
            <>
              <p>
                Invitados que {selectedButton} asistiran:{" "}
                {guestsFiltered.length}
              </p>
              <GuestInfo guestChart={guestChart} />
            </>
          )}

          {selectedButton === "no" && (
            <>
              <p>
                Invitados que {selectedButton} asistiran:{" "}
                {guestsFiltered.length}
              </p>
              <GuestInfo guestChart={guestChart} />
            </>
          )}
        </div>
        <AdminGuests guests={guestsFiltered} />
      </RefreshGuests.Provider>
    </>
  );
}
