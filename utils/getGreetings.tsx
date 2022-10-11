export const getGreetings = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return 'Good morning';
  } else if (hours >= 12 && hours <= 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};
