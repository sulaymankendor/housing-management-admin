import { z } from "zod";
import {
  depositeExpenseSchema,
  expenditureSchema,
  expenseSchema,
  landlordSchema,
  receiptSchema,
  tenantSchema,
} from "./zodValidationSchema";
export type landlordType = z.infer<typeof landlordSchema>;
export type tenantType = z.infer<typeof tenantSchema>;
export type expenseType = z.infer<typeof expenseSchema>;
export type depositeExpenseType = z.infer<typeof depositeExpenseSchema>;
export type expenditureType = z.infer<typeof expenditureSchema>;
export type receiptType = z.infer<typeof receiptSchema>;
