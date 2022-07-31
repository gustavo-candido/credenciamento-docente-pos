import jsonpath from "jsonpath";
import flattendeep from "lodash.flattendeep";

import prioritizeLanguage from "@utils/prioritizeLanguage";

import type { TLattes, TProject } from "@FacomLattesExtractor/types";
import makeIterable from "@utils/makeIterable";
import isFilledString from "@utils/isFilledString";

const getProjects = (lattes: TLattes): TProject[] => {
  const query = jsonpath.query(lattes, "$..['PROJETO-DE-PESQUISA']");

  const projects = flattendeep(query).map((item) => {
    const members = makeIterable(item?.["EQUIPE-DO-PROJETO"]).reduce(
      (acc, team) => {
        return [...acc, ...makeIterable(team?.["INTEGRANTES-DO-PROJETO"])];
      },
      []
    );

    const responsible = members.find(
      (member: Record<string, string>) => member?.["FLAG-RESPONSAVEL"] === "SIM"
    )?.["NRO-ID-CNPQ"];

    const sponsors = makeIterable(item?.["FINANCIADORES-DO-PROJETO"]);
    const has_sponsor = sponsors.length > 0;

    return {
      title: prioritizeLanguage({
        "pt-br": item?.["NOME-DO-PROJETO"],
        en: item?.["NOME-DO-PROJETO-INGLES"],
      }),
      responsible_id: responsible,
      year: parseInt(
        isFilledString(item?.["ANO-FIM"])
          ? item?.["ANO-FIM"]
          : item?.["ANO-INICIO"]
      ),
      has_sponsor,
      kind: item?.["NATUREZA"],
    };
  });

  return projects;
};

export default getProjects;
