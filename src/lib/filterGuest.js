import normalizeText from "./normalizeText";

export default function guestCategories(guests, asistencia) {
  const guestAsist = guests.filter(
    (guest) => normalizeText(guest.asistencia) === asistencia
  );

  const male = guestAsist.filter(
    (guest) => normalizeText(guest.sexo) === "hombre"
  );

  const female = guestAsist.filter(
    (guest) => normalizeText(guest.sexo) === "mujer"
  );

  const man = male.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const boys = male.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const woman = female.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const girls = female.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const filterGuests = {
    man,
    woman,
    boys,
    girls,
  };

  return filterGuests;
}

export function allGuestCategories(guests) {
  const male = guests.filter((guest) => normalizeText(guest.sexo) === "hombre");

  const female = guests.filter(
    (guest) => normalizeText(guest.sexo) === "mujer"
  );

  const man = male.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const boys = male.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const woman = female.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const girls = female.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const filterGuests = {
    man,
    woman,
    boys,
    girls,
  };

  return filterGuests;
}

export function guestFilter(guests, asistencia) {
  const guestAsist = guests.filter(
    (guest) => normalizeText(guest.asistencia) === asistencia
  );

  const male = guestAsist.filter(
    (guest) => normalizeText(guest.sexo) === "hombre"
  );

  const female = guestAsist.filter(
    (guest) => normalizeText(guest.sexo) === "mujer"
  );

  const man = male.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const boys = male.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );

  const woman = female.filter(
    (guest) => normalizeText(guest.categoria) === "adulto"
  );

  const girls = female.filter(
    (guest) => normalizeText(guest.categoria) === "nino"
  );
  return man;
}
