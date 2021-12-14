import React, { FC } from 'react'

interface Props {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const TextInput: FC<Props> = ({ className, placeholder, value, onChange }) => {
  return (    
        <input
          type="text"
          className={'input ' + (className ? className : '')}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />   
  )
}

export default TextInput
