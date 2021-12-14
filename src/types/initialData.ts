import { ProductLine, Invoice } from './types'

export const initialProductLine: ProductLine = {
  description: '',
  quantity: '1',
  rate: '0.00',
}

export const initialInvoice: Invoice = {
  logo: '',
  logoWidth: 100,
  companyName: '',
  name: '',
  companyAddress: '',
  clientName: '',
  clientAddress: '',
  invoiceTitleLabel: 'Invoice #',
  invoiceTitle: '',
  invoiceDateLabel: 'Date',
  invoiceDate: '',
  invoiceDueDateLabel: 'DueDate',
  invoiceDueDate: '',
  productLineDescription: 'Item Description',
  productLineQuantity: 'Qty',
  productLineQuantityRate: 'Rate',
  productLineQuantityAmount: 'Amount',
  productLines: [
    { ...initialProductLine },
    { ...initialProductLine },
  ],
  totalLabel: 'TOTAL',
  notesLabel: 'Notes',
  notes: 'It was great doing business with you.',
}