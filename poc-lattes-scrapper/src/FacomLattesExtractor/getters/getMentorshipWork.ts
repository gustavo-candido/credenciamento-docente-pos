import jsonpath from "jsonpath";
import { hasSponsor, parentJsonPath, prioritizeLanguage } from "@utils/index";

import type {
  TLattes,
  MentorshipWorkByDegree,
  MentorshipWork,
} from "@FacomLattesExtractor/types";

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
      TITULO: prioritizeLanguage({
        "pt-br": statusDegreeMentorshipBasicData?.["TITULO"],
        en: statusDegreeMentorshipBasicData?.["TITULO-INGLES"],
      }),
      ANO: parseInt(statusDegreeMentorshipBasicData?.["ANO"]),
      ...getStudentInfo(status, statusDegreeMentorshipDetails),
      ...getSponsorInfo(statusDegreeMentorshipDetails),
    });
  }

  return statusDegreeMentorshipsData;
};

const getICStatus = (
  lattes: TLattes,
  status: "current" | "concluded"
): MentorshipWorkByDegree[] => {
  const basicDataKey =
    status === "concluded"
      ? "DADOS-BASICOS-DE-OUTRAS-ORIENTACOES-CONCLUIDAS"
      : "DADOS-BASICOS-DE-OUTRAS-ORIENTACOES-EM-ANDAMENTO";

  const detailsDataKey =
    status === "concluded"
      ? "DETALHAMENTO-DE-OUTRAS-ORIENTACOES-CONCLUIDAS"
      : "DETALHAMENTO-DE-OUTRAS-ORIENTACOES-EM-ANDAMENTO";

  const basicOtherMentorship = parentJsonPath(lattes, `$..['${basicDataKey}']`);

  const ICMentorships = basicOtherMentorship.filter((mentorship) => {
    const kind = mentorship?.[basicDataKey]?.["NATUREZA"];
    return kind === "INICIACAO_CIENTIFICA";
  });

  const icStatus = [];

  for (let ICMentorship of ICMentorships) {
    const ICMentorshipsBasicData = ICMentorship?.[basicDataKey];

    const ICMentorshipsBasicDetails = ICMentorship?.[detailsDataKey];

    icStatus.push({
      "TIPO-DE-ORIENTACAO": "ORIENTADOR_PRINCIPAL",
      TITULO: prioritizeLanguage({
        "pt-br": ICMentorshipsBasicData?.["TITULO"],
        en: ICMentorshipsBasicData?.["TITULO-INGLES"],
      }),
      ANO: parseInt(ICMentorshipsBasicData?.["ANO"]),
      ...getStudentInfo(status, ICMentorshipsBasicDetails),
      ...getSponsorInfo(ICMentorshipsBasicDetails),
    });
  }

  return icStatus;
};

const getMentorshipWork = (lattes: TLattes): MentorshipWork => {
  return {
    concluded: {
      ic: getICStatus(lattes, "concluded"),
      master: getStatusDegreeMentorshipWork(lattes, "MESTRADO", "concluded"),
      doctoral: getStatusDegreeMentorshipWork(lattes, "DOUTORADO", "concluded"),
      postdoctoral: getStatusDegreeMentorshipWork(
        lattes,
        "POS-DOUTORADO",
        "concluded"
      ),
    },

    current: {
      ic: getICStatus(lattes, "current"),
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
