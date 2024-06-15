// function to calculate age with the given date of birth
// it will get a birthdate as a date object and return the age as a number
export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  const birthDateYear = birthDate.getFullYear();
  const todayYear = today.getFullYear();
  let age = todayYear - birthDateYear;
  const birthDateMonth = birthDate.getMonth();
  const todayMonth = today.getMonth();
  if (todayMonth < birthDateMonth) {
    age--;
  } else if (todayMonth === birthDateMonth) {
    const birthDateDay = birthDate.getDate();
    const todayDay = today.getDate();
    if (todayDay < birthDateDay) {
      age--;
    }
  }
  return age;
};