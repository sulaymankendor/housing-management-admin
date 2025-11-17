import { z } from "zod";
export const landlordSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phoneNumber: z.string().min(7, "Phone Number must be at least 7 digits"),
  propertyLocation: z
    .array(z.string())
    .nonempty("At least one property location is required"),
});

export const tenantSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phoneNumber: z.string().min(7, "Phone Number must be at least 7 digits"),
  propertyLocation: z.string().min(1, "Location must be provided"),
  propertyType: z.string().min(1, "Select a property type"),
  moveInDate: z.string().min(1, "Select the move in date"),
  rentFee: z.string().min(1, "Enter the rent fee"),
});

export const expenseSchema = z.object({
  tenantID: z.string().min(1, "Tenant ID must be selected"),
  tenantName: z.string().min(3, "Name must be at least 3 characters"),
  propertyLocation: z.string().min(3, "Property Location must be provided"),
  propertyType: z.string().min(3, "Property Location must be provided"),
  totalAmount: z.string().min(1, "Amount must be provided"),
  date: z.string().min(1, "Date must be provided"),
  items: z.array(z.string()).nonempty("At least one items is required"),
});

export const depositeExpenseSchema = z.object({
  tenantID: z.string().min(1, "Tenant ID must be selected"),
  tenantName: z.string().min(3, "Name must be at least 3 characters"),
  propertyLocation: z.string().min(3, "Property Location must be provided"),
  propertyType: z.string().min(3, "Property Location must be provided"),
  depositedAmount: z.string().min(1, "Deposited Amount must be provided"),
  expendedAmount: z.string().min(1, "Expended Amount must be provided"),
  depositedDate: z.string().min(1, "Deposited Date must be provided"),
  items: z.array(z.string()).nonempty("At least one items is required"),
});

export const expenditureSchema = z.object({
  items: z.array(z.string()).nonempty("At least one items is required"),
  paymentMethod: z
    .string()
    .min(3, "Payment Method must be at least 3 characters"),
  amount: z.string().min(1, "Amount must be provided"),
  expenseBy: z.string().min(3, "Expense By must be provided"),
  expenseType: z.string().min(3, "Expense Type must be provided"),
  date: z.string().min(1, "Expense Date must be provided"),
});

export const receiptSchema = z.object({
  receiptNumber: z.string().min(1, "Tenant ID must be selected"),
  receivedFrom: z
    .string()
    .min(3, "Received From must be at least 3 characters"),
  paidTo: z.string().min(3, "Paid To must be provided"),
  propertyType: z.string().min(1, "Property Type must be provided"),
  amount: z.string().min(1, "Amount must be provided"),
  monthPaidFor: z.string().min(1, "Month Paid For must be provided"),
  paymentDate: z.string().min(1, "Date must be provided"),
  paymentMethod: z.string().min(1, "Payment Method must be provided"),
  receivedFromPhoneNumber: z
    .string()
    .min(7, "Received From Phone Number must be at least 7 digits"),
});
