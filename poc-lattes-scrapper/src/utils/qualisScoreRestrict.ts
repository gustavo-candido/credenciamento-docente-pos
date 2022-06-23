import qualisScore from "./qualisScore";

const qualisScoreRestrict = (qualis: string): number => {
  const restrictsQualis = ["A1", "A2", "A3", "A4"];

  if (!restrictsQualis.includes(qualis)) {
    return 0;
  }

  return qualisScore(qualis);
};

export default qualisScoreRestrict;
