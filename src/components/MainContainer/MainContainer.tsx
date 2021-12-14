import React, { FC } from 'react'

interface Props {
  className?: string
}

const MainContainer: FC<Props> = ({ className, children }) => {
  return (
        <div className={'MainContainer ' + (className ? className : '')}>{children}</div>
  )
}

export default MainContainer
