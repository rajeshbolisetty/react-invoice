import React, { FC, useState, useEffect } from 'react'
import { Invoice, ProductLine } from '../../types/types'
import { initialInvoice, initialProductLine } from '../../types/Data'
import TextInput from '../TextInput/TextInput'
import MainContainer from '../MainContainer/MainContainer'
import Container from '../Container/Container'
import Text from '../Text/Text'

interface Props {
  data?: Invoice
  pdfMode?: boolean
}

const InvoiceContainer: FC<Props> = ({ data, pdfMode }) => {
  const [invoice, setInvoice] = useState<Invoice>(data ? { ...data } : { ...initialInvoice })
  const [subTotal, setSubTotal] = useState<number>()

  const handleChange = (name: keyof Invoice, value: string | number) => {
    if (name !== 'productLines') {
      const newInvoice = { ...invoice }

      if (typeof value === 'string') {
        newInvoice[name] = value
      }

      setInvoice(newInvoice)
    }
  }

  const handleProductLineChange = (index: number, name: keyof ProductLine, value: string) => {
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = { ...productLine }

        if (name === 'description') {
          newProductLine[name] = value
        } else {
          if (
            value[value.length - 1] === '.' ||
            (value[value.length - 1] === '0' && value.includes('.'))
          ) {
            newProductLine[name] = value
          } else {
            const n = parseFloat(value)

            newProductLine[name] = (n ? n : 0).toString()
          }
        }

        return newProductLine
      }

      return { ...productLine }
    })

    setInvoice({ ...invoice, productLines })
  }

  const RemoveLineitem = (i: number) => {
    const productLines = invoice.productLines.filter((productLine, index) => index !== i)

    setInvoice({ ...invoice, productLines })
  }

  const AddLinetime= () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }]

    setInvoice({ ...invoice, productLines })
  }

  const ResetState = () => {

    window.location.reload();

  }

  const calculateAmount = (quantity: string, rate: string) => {
    const quantityNumber = parseFloat(quantity)
    const rateNumber = parseFloat(rate)
    const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

    return amount.toFixed(2)
  }

  useEffect(() => {
    let subTotal = 0

    invoice.productLines.forEach((productLine) => {
      const quantityNumber = parseFloat(productLine.quantity)
      const rateNumber = parseFloat(productLine.rate)
      const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

      subTotal += amount
    })

    setSubTotal(subTotal)
  }, [invoice.productLines])

  return (
      <MainContainer className="padding" >
        <Container className="flex" >
          <Container className="w-50" >
            <Text className="bold dark" >From</Text>
            <TextInput
              placeholder="Company"
              value={invoice.companyName}
              onChange={(value) => handleChange('companyName', value)}
              react-invoice
            />  
            <TextInput
              placeholder="From Address"
              value={invoice.companyAddress}
              onChange={(value) => handleChange('companyAddress', value)}
           
            />   
          </Container>
        </Container>

        <Container className="flex mt-40" >
          <Container className="w-55" >
          <Text className="bold dark" >To</Text>
            <TextInput
              placeholder="Invoice Name"
              value={invoice.clientName}
              onChange={(value) => handleChange('clientName', value)}            
            />
            <TextInput
              placeholder="Address"
              value={invoice.clientAddress}
              onChange={(value) => handleChange('clientAddress', value)}         
            />
          </Container>
          <Container className="w-45" >
            <Container className="flex mb-5" >
              <Text className="bold dark" >{invoice.invoiceTitleLabel}</Text>
              <Container className="w-60" >
                <TextInput
                  placeholder="1234567890"
                  value={invoice.invoiceTitle}
                  onChange={(value) => handleChange('invoiceTitle', value)}
                 
                />
              </Container>
            </Container>
            <Container className="flex mb-5" >
              <Text className="bold dark" >{invoice.invoiceDateLabel}</Text>
              <Container className="w-60">
                <TextInput
                  value={invoice.invoiceDate}
                  onChange={(value) => handleChange('invoiceDate', value)}
                
                />
              </Container>
            </Container>
            <Container className="flex mb-5" >
              <Text className="bold dark" >{invoice.invoiceDueDateLabel}</Text>
              <Container className="w-60" >
                <TextInput
                  value={invoice.invoiceDueDate}
                  onChange={(value) => handleChange('invoiceDueDate', value)}
                 
                />
              </Container>
            </Container>
          </Container>
        </Container>

        <Container className="mt-30 background-dark flex" >
          <Container className="w-48 p-4-8" >
           <Text className="white bold" >{invoice.productLineDescription}</Text>
          </Container>
          <Container className="w-17 p-4-8" >
           <Text className="white bold" >{invoice.productLineQuantity}</Text>
          </Container>
          <Container className="w-17 p-4-8" >
          <Text className="white bold" >{invoice.productLineQuantityRate}</Text>
          </Container>
          <Container className="w-18 p-4-8" >
           <Text className="white bold" >{invoice.productLineQuantityAmount}</Text>
          </Container>
        </Container>

        {invoice.productLines.map((productLine, i) => {
          return pdfMode && productLine.description === '' ? (
            <Text key={i}></Text>
          ) : (
            <Container key={i} className="row flex" >
              <Container className="w-48 p-4-8 pb-10" >
                  <TextInput
                  className="dark"
                  value={productLine.description}
                  placeholder="Enter Lineitem name"
                  onChange={(value) => handleProductLineChange(i, 'description', value)}
                 
                />
              </Container>
              <Container className="w-17 p-4-8 pb-10" >
                <TextInput
                  className="dark"
                  value={productLine.quantity}
                  onChange={(value) => handleProductLineChange(i, 'quantity', value)}
                />
              </Container>
              <Container className="w-17 p-4-8 pb-10" >
                <TextInput
                  className="dark right"
                  value={productLine.rate}
                  onChange={(value) => handleProductLineChange(i, 'rate', value)}
                />
              </Container>
              <Container className="w-18 p-4-8 pb-10">
                <Text className="dark right" >
                  {calculateAmount(productLine.quantity, productLine.rate)}
                </Text>
              </Container>
                <button
                  className="link row__remove"
                  aria-label="Remove Row"
                  title="Remove Row"
                  onClick={() => RemoveLineitem(i)}
                >
                  <span className="icon icon-remove background-green"></span>
                </button>          
            </Container>
          )
        })}
        <Container className="flex">
          <Container className="w-50 mt-10" >         
              <button className="link" onClick={AddLinetime}>
                <span className="icon icon-add background-green mr-10"></span>
                Add Line Item
              </button>   
          </Container>
          <Container className="w-50 mt-20" >
            <Container className="flex" >
              <Text className="bold dark" >{invoice.totalLabel}</Text>
              <Container className="w-50 p-5" >
                <Text className="right bold dark" >
                  {subTotal?.toFixed(2)}
                </Text>
              </Container>
            </Container>
          </Container>
        </Container>
        <Container className="mt-20" >
        <Text className="bold dark" >Instructions</Text>
        <Text className="dark" >Type your instructions here</Text>
        </Container>
        <button onClick={ResetState}>
            <span className=""></span>
           Submit
          </button>   
      </MainContainer>
  )
}

export default InvoiceContainer
