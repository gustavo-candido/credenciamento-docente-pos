const isFilledString = (arg: unknown): arg is string =>
  !!arg && typeof arg === "string" && arg?.trim() !== "";

export default isFilledString;
