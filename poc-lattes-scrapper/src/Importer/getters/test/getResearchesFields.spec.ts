import getResearchesFields from "../getResearchesFields";

import type { TLattes } from "../../types";

type Subject = {
  subject: string;
  lattes: TLattes;
  researchesFields?: string[];
  lang?: string;
};

describe("getResearchesFields", () => {
  describe.each([
    "TITULO-DA-LINHA-DE-PESQUISA",
    "TITULO-DA-LINHA-DE-PESQUISA-INGLES",
  ])("key path: %s", (researchKey) => {
    describe("Has researches", () => {
      const trivialSubject: Subject = {
        subject: "trivialSubject",
        lattes: {
          ["LINHA-DE-PESQUISA"]: {
            [researchKey]: "Research #1",
          },
        },
        researchesFields: ["Research #1"],
      };

      const innerChildSubject: Subject = {
        subject: "innerChildSubject",
        lattes: {
          foo: {
            bar: {
              ["LINHA-DE-PESQUISA"]: {
                [researchKey]: "Research #1",
              },
            },
          },
        },
        researchesFields: ["Research #1"],
      };

      const multipleOccurSubject: Subject = {
        subject: "multipleOccurSubject",
        lattes: {
          ["LINHA-DE-PESQUISA"]: [
            {
              [researchKey]: "Research #1",
            },
            {
              [researchKey]: "Research #2",
            },
          ],
        },
        researchesFields: ["Research #1", "Research #2"],
      };

      const multipleOccurWithInnerSubject: Subject = {
        subject: "multipleOccurWithInnerSubject",
        lattes: {
          ["LINHA-DE-PESQUISA"]: [
            {
              [researchKey]: "Research #1",
            },
            {
              [researchKey]: "Research #2",
            },
          ],
          foo: [
            {
              ["LINHA-DE-PESQUISA"]: [
                {
                  [researchKey]: "Research #3",
                },
                {
                  [researchKey]: "Research #4",
                },
              ],
            },
            {
              ["LINHA-DE-PESQUISA"]: {
                [researchKey]: "Research #5",
              },
            },
          ],
        },
        researchesFields: [
          "Research #1",
          "Research #2",
          "Research #3",
          "Research #4",
          "Research #5",
        ],
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

      const emptySubject: Subject = {
        subject: "emptySubject",
        lattes: {
          ["LINHA-DE-PESQUISA"]: {
            [researchKey]: "",
          },
        },
      };

      const blankSubject: Subject = {
        subject: "blankSubject",
        lattes: {
          ["LINHA-DE-PESQUISA"]: {
            [researchKey]: " ",
          },
        },
      };

      test.each([noOccurSubject, emptySubject, blankSubject])(
        "Should return undefined for $subject",
        ({ lattes }) => {
          expect(getResearchesFields(lattes)).toBeUndefined();
        }
      );
    });
  });

  describe("Have researches in both keys", () => {
    const bothKeysSubject: Subject = {
      subject: "bothKeysSubject",
      lattes: {
        ["LINHA-DE-PESQUISA"]: {
          ["TITULO-DA-LINHA-DE-PESQUISA"]: "Pesquisa #1",
          ["TITULO-DA-LINHA-DE-PESQUISA-INGLES"]: "Research #1",
        },
      },
      researchesFields: ["Pesquisa #1"],
      lang: "pt",
    };

    const ptEmptyKeysSubject: Subject = {
      subject: "ptEmptyKeysSubject",
      lattes: {
        ["LINHA-DE-PESQUISA"]: {
          ["TITULO-DA-LINHA-DE-PESQUISA"]: "",
          ["TITULO-DA-LINHA-DE-PESQUISA-INGLES"]: "Research #1",
        },
      },
      researchesFields: ["Research #1"],
      lang: "en",
    };

    const ptBlankKeysSubject: Subject = {
      subject: "ptBlankKeysSubject",
      lattes: {
        ["LINHA-DE-PESQUISA"]: {
          ["TITULO-DA-LINHA-DE-PESQUISA"]: " ",
          ["TITULO-DA-LINHA-DE-PESQUISA-INGLES"]: "Research #1",
        },
      },
      researchesFields: ["Research #1"],
      lang: "en",
    };

    test.each([bothKeysSubject, ptEmptyKeysSubject, ptBlankKeysSubject])(
      "Should get the $lang version of $subject",
      ({ lattes, researchesFields }) => {
        expect(getResearchesFields(lattes)).toEqual(researchesFields);
      }
    );
  });
});
