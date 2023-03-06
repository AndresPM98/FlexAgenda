export const validate = (value, users) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log(users);
  const errors = {};
  value.email &&
    !regex.test(value.email) &&
    (errors.email = "Email ingresado no valido");
  if (users === "password") errors.password = "la contraseña es incorrecta";
  if (users === "email")
    errors.email = "El email ingresado no ha sido logueado";
  //   !value.name && (errors.name = "Debes llenar este campo");
  //   !value.countries.length &&
  //     (errors.countries = "Debe elegir al menos un pais");
  //   (value.difficulty > 5 || value.difficulty < 1) &&
  //     (errors.difficulty = "la dificultad debe ser entre 1-5 incluidos");
  return errors;
};
