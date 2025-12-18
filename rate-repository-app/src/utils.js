export const formatCount = (value) =>
  value < 1000
    ? String(value)
    : `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
