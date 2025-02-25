import React from 'react'

function Button({className,text}) {
  return (
    <div className={`${className}`}>{text}</div>
  )
}

export default Button