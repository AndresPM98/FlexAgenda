export const validate = (value, professionals) => {
  let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let regexName = /^[a-zA-Z0-9_ -]{3,16}$/
 
  const hasNumber = /\d/;
  const minLength = 8;
  const onlyNumbers = /^[0-9]+$/;
  const errors = {};
  value.name &&
    !regexName.test(value.name) &&
    (errors.name = "debe contener al menos 3 caracteres");

  if (value.password) {
      (!hasNumber.test(value.password) &&
        (errors.password = "Debe tener al menos un numero")) ||
      (value.password.length <= minLength &&
        (errors.password = "Debe contener al menos 8 caracteres"));
  }

  if (value.phone)
    !onlyNumbers.test(value.phone) &&
      (errors.phone = "solo debe ingresar caracteres numericos");

  if (professionals) {
    const findClient = professionals.find((prof) => prof.email === value.email);
    if (findClient) errors.email = "este correo ya esta registrado";
  }

  value.email &&
    !regexEmail.test(value.email) &&
    (errors.email = "Email ingresado no valido");

  //   !value.name && (errors.name = "Debes llenar este campo");
  //   !value.countries.length &&
  //     (errors.countries = "Debe elegir al menos un pais");
  //   (value.difficulty > 5 || value.difficulty < 1) &&
  //     (errors.difficulty = "la dificultad debe ser entre 1-5 incluidos");
  return errors;
};
