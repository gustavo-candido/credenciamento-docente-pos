import { hasSponsor, parentJsonPath, prioritizeLanguage } from "@utils/index";

import type {
  TLattes,
  MentorshipWorkByDegreeDTO,
  TMentorshipWork,
} from "@FacomLattesExtractor/types";

const getSponsorInfo = (statusDegreeMentorshipDetails: any) => {
  let sponsorship: Pick<
    MentorshipWorkByDegreeDTO,
    "has_sponsor" | "sponsor_code" | "sponsor_name"
  > = {
    has_sponsor: hasSponsor(statusDegreeMentorshipDetails?.["FLAG-BOLSA"]),
  };

  if (sponsorship.has_sponsor) {
    sponsorship = {
      ...sponsorship,
      sponsor_code:
        statusDegreeMentorshipDetails?.["CODIGO-AGENCIA-FINANCIADORA"],
      sponsor_name: statusDegreeMentorshipDetails?.["NOME-DA-AGENCIA"],
    };
  }

  return sponsorship;
};

const getStudentInfo = (
  status: "current" | "concluded",
  statusDegreeMentorshipDetails: any
): Pick<MentorshipWorkByDegreeDTO, "student_name"> => {
  return {
    student_name:
      status === "concluded"
        ? statusDegreeMentorshipDetails?.["NOME-DO-ORIENTADO"]
        : statusDegreeMentorshipDetails?.["NOME-DO-ORIENTANDO"],
  };
};

const getStatusDegreeMentorshipWork = (
  lattes: TLattes,
  degree: "MESTRADO" | "DOUTORADO" | "POS-DOUTORADO",
  status: "current" | "concluded"
): MentorshipWorkByDegreeDTO[] => {
  const statusDegreeMentorshipsData: MentorshipWorkByDegreeDTO[] = [];

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
      role: statusDegreeMentorshipDetails?.["TIPO-DE-ORIENTACAO"],
      title: prioritizeLanguage({
        "pt-br": statusDegreeMentorshipBasicData?.["TITULO"],
        en: statusDegreeMentorshipBasicData?.["TITULO-INGLES"],
      }),
      year: parseInt(statusDegreeMentorshipBasicData?.["ANO"]),
      ...getStudentInfo(status, statusDegreeMentorshipDetails),
      ...getSponsorInfo(statusDegreeMentorshipDetails),
    });
  }

  return statusDegreeMentorshipsData;
};

const getICStatus = (
  lattes: TLattes,
  status: "current" | "concluded"
): MentorshipWorkByDegreeDTO[] => {
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

  const icStatus = [] as MentorshipWorkByDegreeDTO[];

  for (let ICMentorship of ICMentorships) {
    const ICMentorshipsBasicData = ICMentorship?.[basicDataKey];

    const ICMentorshipsBasicDetails = ICMentorship?.[detailsDataKey];

    icStatus.push({
      role: "ORIENTADOR_PRINCIPAL",
      title: prioritizeLanguage({
        "pt-br": ICMentorshipsBasicData?.["TITULO"],
        en: ICMentorshipsBasicData?.["TITULO-INGLES"],
      }),
      year: parseInt(ICMentorshipsBasicData?.["ANO"]),
      ...getStudentInfo(status, ICMentorshipsBasicDetails),
      ...getSponsorInfo(ICMentorshipsBasicDetails),
    });
  }

  return icStatus;
};

const getMentorshipWork = (lattes: TLattes): TMentorshipWork => {
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
