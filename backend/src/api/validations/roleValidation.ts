import Joi from "joi";
import {
  requiredArray,
  requiredBoolean,
  requiredNumber,
  requiredString,
} from "./validationHelper";

export const roleSchema = Joi.object({
  id: Joi.string().optional(),
  title: requiredString("Title"),
  description: requiredString("Description"),
}).options({ allowUnknown: true });
export const employeeSchema = Joi.object({
  id: Joi.string().optional(),
  department: requiredString("Department"),
  employees: requiredString("employees"),
  userId: Joi.string().optional(),
}).options({ allowUnknown: true });
