export default function (value, rules) {
  for (let rule in rules) {
    switch (rule) {
      case 'notEmpty': return notEmptyValidator(value);
      default: return true;
    }
  }
}

function notEmptyValidator (value) {
  return value.trim() !== "";
}