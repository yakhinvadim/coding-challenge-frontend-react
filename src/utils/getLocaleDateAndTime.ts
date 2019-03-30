const getLocaleDateAndTime = (secondsTimestamp: number) =>
  new Date(secondsTimestamp * 1000).toLocaleString([], {
    minute: "numeric",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric"
  });

export default getLocaleDateAndTime;
