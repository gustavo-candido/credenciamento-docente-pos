import { hasSponsor, parentJsonPath } from "../../utils";

import type { TLattes, MentorshipWorkByDegree, MentorshipWork } from "../types";

const getSponsorInfo = (statusDegreeMentorshipDetails: any) => {
  let sponsorship: Pick<
    MentorshipWorkByDegree,
    "FLAG-BOLSA" | "CODIGO-AGENCIA-FINANCIADORA" | "NOME-DA-AGENCIA"
  > = {
    "FLAG-BOLSA": statusDegreeMentorshipDetails?.["FLAG-BOLSA"],
  };

  if (hasSponsor(statusDegreeMentorshipDetails?.["FLAG-BOLSA"])) {
    sponsorship = {
      ...sponsorship,
      "CODIGO-AGENCIA-FINANCIADORA":
        statusDegreeMentorshipDetails?.["CODIGO-AGENCIA-FINANCIADORA"],
      "NOME-DA-AGENCIA": statusDegreeMentorshipDetails?.["NOME-DA-AGENCIA"],
    };
  }

  return sponsorship;
};

const getStudentInfo = (
  status: "current" | "concluded",
  statusDegreeMentorshipDetails: any
): Pick<MentorshipWorkByDegree, "NOME-DO-ORIENTADO" | "NOME-DO-ORIENTANDO"> => {
  if (status === "concluded") {
    return {
      "NOME-DO-ORIENTADO": statusDegreeMentorshipDetails?.["NOME-DO-ORIENTADO"],
    };
  }
  return {
    "NOME-DO-ORIENTANDO": statusDegreeMentorshipDetails?.["NOME-DO-ORIENTANDO"],
  };
};

const getStatusDegreeMentorshipWork = (
  lattes: TLattes,
  degree: "MESTRADO" | "DOUTORADO" | "POS-DOUTORADO",
  status: "current" | "concluded"
): MentorshipWorkByDegree[] => {
  const statusDegreeMentorshipsData: MentorshipWorkByDegree[] = [];

  const statusDegreeMentorships = parentJsonPath(
    lattes,
    status === "concluded"
      ? `$..['DETALHAMENTO-DE-ORIENTACOES-CONCLUIDAS-PARA-${degree}']`
      : `$..['DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-${degree}']`
  );

  for (let statusDegreeMentorship of statusDegreeMentorships) {
    const statusDegreeMentorshipDetails =
      statusDegreeMentorship?.[
        status === "concluded"
          ? `DETALHAMENTO-DE-ORIENTACOES-CONCLUIDAS-PARA-${degree}`
          : `DETALHAMENTO-DA-ORIENTACAO-EM-ANDAMENTO-DE-${degree}`
      ];

    const statusDegreeMentorshipBasicData =
      statusDegreeMentorship?.[
        status === "concluded"
          ? `DADOS-BASICOS-DE-ORIENTACOES-CONCLUIDAS-PARA-${degree}`
          : `DADOS-BASICOS-DA-ORIENTACAO-EM-ANDAMENTO-DE-${degree}`
      ];

    statusDegreeMentorshipsData.push({
      "TIPO-DE-ORIENTACAO":
        statusDegreeMentorshipDetails?.["TIPO-DE-ORIENTACAO"],
      TITULO: statusDegreeMentorshipBasicData?.["TITULO"],
      ANO: statusDegreeMentorshipBasicData?.["ANO"],
      ...getStudentInfo(status, statusDegreeMentorshipDetails),
      ...getSponsorInfo(statusDegreeMentorshipDetails),
    });
  }

  return statusDegreeMentorshipsData;
};

const getMentorshipWork = (lattes: TLattes): MentorshipWork => {
  return {
    concluded: {
      master: getStatusDegreeMentorshipWork(lattes, "MESTRADO", "concluded"),
      doctoral: getStatusDegreeMentorshipWork(lattes, "DOUTORADO", "concluded"),
      postdoctoral: getStatusDegreeMentorshipWork(
        lattes,
        "POS-DOUTORADO",
        "concluded"
      ),
    },

    current: {
      master: getStatusDegreeMentorshipWork(lattes, "MESTRADO", "current"),
      doctoral: getStatusDegreeMentorshipWork(lattes, "DOUTORADO", "current"),
      postdoctoral: getStatusDegreeMentorshipWork(
        lattes,
        "POS-DOUTORADO",
        "current"
      ),
    },
  };
};

export default getMentorshipWork;
