const qualisScore = (qualis: string): number => {
  const scores: Record<string, number> = {
    A1: 1000,
    A2: 875,
    A3: 750,
    A4: 625,
    B1: 500,
    B2: 200,
    B3: 100,
    B4: 50,
  };

  return qualis in scores ? scores[qualis] : 0;
};

export default qualisScore;
