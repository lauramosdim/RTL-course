import React from "react"

const CustomInput = ({ children, onChange, value }) => {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Example"
        id="search"
        data-testId="custom-input"
      />
    </div>
  )
}

export default CustomInput
