const isQualisRestrict = (qualis: string) => {
  const restrictsQualis = ["A1", "A2", "A3", "A4"];

  return restrictsQualis.includes(qualis);
};

export default isQualisRestrict;
