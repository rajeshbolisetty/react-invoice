import React, { FC } from 'react'

interface Props {
  className?: string
  children?: string
}

const Text: FC<Props> = ({ className, children }) => {
  return (
        <span className={'Text ' + (className ? className : '')}>{children}</span>
  )
}

export default Text
