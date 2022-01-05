import React, { useState, useEffect } from "react"
import "./App.css"
import { getUser } from "./get-user"
import CustomInput from "./CustomInput"

function App() {
  const [text, setText] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div>
      {user ? <p>Username: {user.name}</p> : null}
      <CustomInput value={text} onChange={handleChange}>
        input:
      </CustomInput>
      {/* <CustomInput value={text} onChange={handleChange}>
        input:
      </CustomInput> */}
      <p>You typed:{text || "..."}</p>
      {/* text || '...' lo mismo que arriba */}
    </div>
  )
}

export default App
