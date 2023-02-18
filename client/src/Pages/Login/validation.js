export const validate = (value) => {
  let regex = /^[a-zA-Z]+$/;

  const errors = {};
  !regex.test(value.name) &&
    (errors.name = "No debes incluir caracteres o espacios");
//   !value.name && (errors.name = "Debes llenar este campo");
//   !value.countries.length &&
//     (errors.countries = "Debe elegir al menos un pais");
//   (value.difficulty > 5 || value.difficulty < 1) &&
//     (errors.difficulty = "la dificultad debe ser entre 1-5 incluidos");
  return errors;
};
