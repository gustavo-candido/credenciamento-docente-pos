import getName from "../getName";

import type { TLattes } from "@Importer/types";

describe("getResearchesFields", () => {
  describe("Lattes contains name", () => {
    test("Should return teacher full name", () => {
      const name = "Professor Full Name";
      const lattes: TLattes = {
        ["CURRICULO-VITAE"]: {
          ["DADOS-GERAIS"]: {
            ["NOME-COMPLETO"]: name,
          },
        },
      };
      expect(getName(lattes)).toEqual(name);
    });
  });

  describe("Lattes didn't contains name", () => {
    const emptyLattes: TLattes = {};
    const curriculumVitae: TLattes = {
      ["CURRICULO-VITAE"]: {},
    };
    const generalData: TLattes = {
      ["CURRICULO-VITAE"]: {
        ["DADOS-GERAIS"]: {},
      },
    };
    const emptyName: TLattes = {
      ["CURRICULO-VITAE"]: {
        ["DADOS-GERAIS"]: {
          ["NOME-COMPLETO"]: "",
        },
      },
    };
    const blankName: TLattes = {
      ["CURRICULO-VITAE"]: {
        ["DADOS-GERAIS"]: {
          ["NOME-COMPLETO"]: " ",
        },
      },
    };

    test.each([
      emptyLattes,
      curriculumVitae,
      generalData,
      emptyName,
      blankName,
    ])("Should return undefined", (lattes) => {
      expect(getName(lattes)).toBeUndefined();
    });
  });
});
