import { CSSProperties } from 'react'

export interface ProductLine {
  description: string
  quantity: string
  rate: string
}

export interface Invoice {
  companyName: string
  name: string
  companyAddress: string
  clientName: string
  clientAddress: string
  invoiceTitleLabel: string
  invoiceTitle: string
  invoiceDateLabel: string
  invoiceDate: string
  invoiceDueDateLabel: string
  invoiceDueDate: string
  productLineDescription: string
  productLineQuantity: string
  productLineQuantityRate: string
  productLineQuantityAmount: string
  productLines: ProductLine[]
  totalLabel: string
  notesLabel: string
  notes: string
}

export interface CSSClasses {
  [key: string]: CSSProperties
}
