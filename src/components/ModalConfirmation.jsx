export default function ModalConfirmation({ open, onClose, guest }) {
  function handleNo() {
    onClose();
    window.location.href = "/";
  }

  function handleYes() {
    onClose();
  }

  return (
    // backdrop
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/30" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:bg-gray-200"
        >
          <img
            src="./src/icons/Close.svg"
            alt="close icon"
            className="size-5"
          />
        </button>
        <div className="text-center w-80">
          <div className="mx-auto py-4 w-full">
            <p className="text-xl font-semibold pb-4 text-secondaryFont">
              {guest.asistencia === "si"
                ? "¡Nos vemos en la boda!"
                : `Lamentamos que no puedas acompañarnos, ${guest.Nombre}.`}
            </p>
            {guest.asistencia === "si" && (
              <p className="text-lg">
                <strong>Boleto:</strong> {guest.Categoria}
              </p>
            )}
            <p className="text-lg">¿Deseas confirmar a otro invitado?</p>
          </div>
          <div className="flex gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
