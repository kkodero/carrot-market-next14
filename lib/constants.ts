import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 4;
export const NAME_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";