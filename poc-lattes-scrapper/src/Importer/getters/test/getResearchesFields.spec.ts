import getResearchesFields from "../getResearchesFields";

import type { TLattes } from "Importer/types";

type Subject = {
  subject: string;
  lattes: TLattes;
  researchesFields?: string[];
};

describe("getResearchesFields", () => {
  describe("Has researches", () => {
    const trivialSubject: Subject = {
      subject: "trivialSubject",
      lattes: {
        ["TITULO-DA-LINHA-DE-PESQUISA"]: "Research #1",
      },
      researchesFields: ["Research #1"],
    };

    const innerChildSubject: Subject = {
      subject: "innerChildSubject",
      lattes: {
        foo: {
          bar: {
            ["TITULO-DA-LINHA-DE-PESQUISA"]: "Research #1",
          },
        },
      },
      researchesFields: ["Research #1"],
    };

    const multipleOccurSubject: Subject = {
      subject: "multipleOccurSubject",
      lattes: {
        foo: {
          ["TITULO-DA-LINHA-DE-PESQUISA"]: "Research #1",
        },
        bar: {
          ["TITULO-DA-LINHA-DE-PESQUISA"]: "Research #2",
        },
      },
      researchesFields: ["Research #1", "Research #2"],
    };

    const multipleOccurWithInnerSubject: Subject = {
      subject: "multipleOccurWithInnerSubject",
      lattes: {
        foo: {
          ["TITULO-DA-LINHA-DE-PESQUISA"]: "Research #1",
        },
        bar: {
          fooBar: {
            ["TITULO-DA-LINHA-DE-PESQUISA"]: "Research #2",
          },
        },
      },
      researchesFields: ["Research #1", "Research #2"],
    };

    test.each([
      trivialSubject,
      innerChildSubject,
      multipleOccurSubject,
      multipleOccurWithInnerSubject,
    ])(
      "Should get all researches fields for $subject",
      ({ lattes, researchesFields }) => {
        expect(getResearchesFields(lattes)).toEqual(researchesFields);
      }
    );
  });

  describe("Don't have researches", () => {
    const noOccurSubject: Subject = {
      subject: "noOccurSubject",
      lattes: {},
    };

    test.each([noOccurSubject])(
      "Should get all researches fields for $subject",
      ({ lattes }) => {
        expect(getResearchesFields(lattes)).toBeUndefined();
      }
    );
  });
});
