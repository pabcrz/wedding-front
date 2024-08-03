import { useState } from "react";
import { toast } from "sonner";
import { confirmGuest } from "../pages/api/data";

export default function Modal({ open, onClose, guest, onConfirm }) {
  const [confirmation, setConfirmation] = useState(false);
  const [writeName, setWriteName] = useState("");
  const [confirmName, setConfirmName] = useState("");

  function handleNo() {
    setConfirmation(true);
    // onClose();
    setWriteName(normalizeName(guest.fullName));
    guest.asistencia = "no";
  }

  function handleYes() {
    setConfirmation(true);
    // onClose();
    setWriteName(normalizeName(guest.fullName));
    guest.asistencia = "si";
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (normalizeName(confirmName) === writeName) {
      toast.promise(confirmGuest(guest), {
        loading: "Confirmando...",
        success: (data) => {
          return `Tu respuesta ha sido enviada...`;
        },
        error: "Error al enviar tu respuesta",
      });
      console.log(`${guest.fullName} ${guest.asistencia} asistira`);
      handleClose();
      onConfirm();
    } else {
      alert("No hay coincidencia");
      return false;
    }
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

  function handleClose() {
    onClose();
    setConfirmation(false);
  }
  return (
    // backdrop
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/30" : "invisible"}
      `}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`
          bg-white rounded-xl p-6 transition-all w-96
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:bg-gray-200"
        >
          <img src="/icons/close.svg" alt="close icon" className="size-5" />
        </button>
        <div className="text-center">
          <div className="mx-auto py-4 w-full">
            <h3 className="text-xl font-semibold text-secondaryFont">
              ¡Hola, {guest.fullName}!
            </h3>
            {!confirmation && (
              <p className="text-lg">¿Nos acompañarás en nuestra boda?</p>
            )}
          </div>
          <div className="flex gap-4">
            {!confirmation && (
              <>
                <button
                  className="w-full hover:bg-red-400 rounded hover:text-white"
                  onClick={handleNo}
                >
                  No
                </button>
                <button
                  className="w-full hover:bg-mainBG p-2 rounded hover:text-secondaryFont"
                  onClick={handleYes}
                >
                  Si
                </button>
              </>
            )}
            {confirmation && (
              <div className="flex-col">
                <p className="text-lg">
                  Para confirmar que
                  <strong> {guest.asistencia} asistirás</strong> escribe lo
                  siguiente: "<strong>{writeName}</strong>"
                </p>
                <form onSubmit={handleConfirm}>
                  <input
                    type="text"
                    className="border-2 rounded-sm px-2 m-3 focus:outline-none border-mainBG"
                    onChange={(e) => setConfirmName(e.target.value)}
                  />
                  <button
                    className="border border-mainFont text-mainFont hover:bg-mainFont p-2 rounded hover:text-white"
                    onClick={handleConfirm}
                    onKeyDownCapture={handleConfirm}
                  >
                    Confirmar
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
