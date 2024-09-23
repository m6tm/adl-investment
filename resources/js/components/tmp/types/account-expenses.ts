import { MainInvoiceCustom } from "../interfaces/pages/invoice"

export type RevenuSheet = {
  id: string
  companie_id: string
  user_id: string
  first_name: string
  last_name: string
  company_name: string
  adress_street?: string
  email: string
  fax: string
  payment_date: string | null
  revenue: string
  adress_place?: string
  phone: string
  postal_code: string
  document: string
  document_original: string
  description: string
  created_at: string
  updated_at: string
}

export type RevenuSheetCollection = Array<RevenuSheet>;

export type Expense = {
	id: string
        companie_id: string
	user_id: string
	first_name: string
	last_name: string
	company_name: string
	adress_street?: string
	email: string
	fax: string
	payment_date: string
	amount: string
	adress_place?: string
	phone: string
	postal_code: string
	document: string
	document_original: string
	description: string
	created_at: string
	updated_at: string
}

export type ExpenseCollection = Array<Expense>;


export type BalanceSheetGroup = {
  revenues: RevenuSheetCollection
  expenses: ExpenseCollection
  invoices: Array<MainInvoiceCustom>
}
