export const calculateEndTime = (): Date => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now;
};
