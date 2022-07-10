export const filterByOrientador = (data: { "TIPO-DE-ORIENTACAO": string }) =>
  data["TIPO-DE-ORIENTACAO"] === "ORIENTADOR_PRINCIPAL";

export const filterByCoorientador = (data: { "TIPO-DE-ORIENTACAO": string }) =>
  data["TIPO-DE-ORIENTACAO"] === "CO_ORIENTADOR";
