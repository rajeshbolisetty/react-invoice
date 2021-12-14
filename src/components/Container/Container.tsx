import React, { FC } from 'react'

interface Props {
  className?: string
}

const Container: FC<Props> = ({ className, children }) => {
  return (    
        <div className={'Container ' + (className ? className : '')}>{children}</div> 
  )
}

export default Container