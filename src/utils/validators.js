export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPositiveNumber(value) {
  return typeof value === "number" && value > 0 && isFinite(value);
}

export function isWithinRange(value, min, max) {
  return value >= min && value <= max;
}

export function isNotEmpty(value) {
  return value !== null && value !== undefined && value !== "";
}
