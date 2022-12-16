export const fixCost = (cost: number): string => {
  const parts = cost.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${parts.join('.')}руб`;
};
