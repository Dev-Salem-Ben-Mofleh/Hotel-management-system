function validateWithRegex(value: string, regex: RegExp): boolean {
  return regex.test(value);
}

export function isNumber(value: string): boolean {
  return validateWithRegex(value, /^[0-9]+$/);
}

export function validateName(value: string): boolean {
  return validateWithRegex(value, /^[\w-]+$/);
}

export function validatePhone(phone: string): boolean {
  return validateWithRegex(phone, /^01(0|1|2|5)\d{8}$/);
}

export function validatePassword(password: string): boolean {
  return validateWithRegex(
    password,
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  );
}

export function validateEmail(email: string): boolean {
  return validateWithRegex(
    email,
    /^[\w!#$%&'*+\-/=?^_`{|}~]+(\.[\w!#$%&'*+\-/=?^_`{|}~]+)*@[\w!#$%&'*+\-/=?^_`{|}~]+(\.[\w!#$%&'*+\-/=?^_`{|}~]+)+$/
  );
}
