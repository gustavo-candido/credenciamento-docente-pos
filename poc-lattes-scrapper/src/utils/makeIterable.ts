const makeIterable = (item: unknown) => {
  return Array.isArray(item) ? item : [item];
};

export default makeIterable;
