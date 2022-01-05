import React from "react"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import App from "./App"
import { getUser } from "./get-user"
import userEvent from "@testing-library/user-event"

jest.mock("./get-user") //mockeamos la respuesta...

// const mockedGetUser=jest.mock(getUser)

describe("when everything is ok", () => {
  beforeEach(async () => {
    render(<App />)
    await waitFor(() => expect(getUser).toHaveBeenCalled())
    //estamos esperando a que pase algo y testeando después de que eso pasa
  })
  test("should render de app component without crasing", () => {
    screen.debug()
  })
  test("should select the children taht is being passed to the CustomInput Component", () => {
    screen.getAllByText("input:")
    screen.getAllByText(/input/)
    expect(screen.getAllByText("input:")[0]).toBeInTheDocument()
    // screen.getByText("input:")
    // screen.getByText(/input/)
    // expect(screen.getByText("input:")).toBeInTheDocument()
  })

  test("should select the input by its role", () => {
    screen.getAllByRole("textbox")
    expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument()
    // expect(screen.getAllByRole("textbox")[1]).toBeInTheDocument()
    // expect(screen.getAllByRole("textbox").length).toEqual(2)
    // expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
  test("should select a label element by its text", () => {
    screen.getByLabelText("input:")
    //este test pasa a pesar de ser varios inputs
    screen.debug()
  })
  test("should select input by placeholder text", () => {
    screen.getAllByPlaceholderText("Example")
    // screen.getByPlaceholderText("Example")
  })

  test("should not find the role holi in our component", () => {
    const result = screen.queryByRole("holi")
    console.log(result)
    expect(screen.queryByRole("holi")).toBeNull()
    //  expect( screen.queryByRole('textbox')).toBeNull()
  })
})

describe("when the component fetches the user successfully", () => {
  beforeEach(async () => {
    getUser.mockClear()
  })

  test("should call getUser Once", async () => {
    render(<App />)
    await waitFor(() => expect(getUser).toHaveBeenCalledTimes(1))
  })
  test("should render de username passed", async () => {
    const name = "lala"
    // getUser.mockImplementationOnce(() =>
    //   Promise.resolve({ id: 1, name: "laura" })
    // )

    getUser.mockResolvedValueOnce({ id: 1, name })
    render(<App />)
    screen.debug()

    //cuando imprimo el componente veo que primero aparece el username vacío y luego aparece lala
    expect(screen.queryByText(/Username/)).toBeNull()
    screen.debug()
    expect(await screen.findByText(/Username/)).toBeTruthy()
    expect(await screen.findByText(/Username:/)).toBeInTheDocument()
    screen.debug()
    // expect(await screen.findByText(`Username: laura`)).toBeInTheDocument()
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument()
    expect(await screen.findByText(/name/)).toBeInTheDocument()
  })
})

describe("When the user enter some text in the input element", () => {
  test("should display the text in the screen", async () => {
    //es mejor usar userEvent que fire event porque imita el browser event more closely than the verb api
    render(<App />)
    await waitFor(() => expect(getUser).toHaveBeenCalled())

    // eslint-disable-next-line jest/valid-expect
    expect(screen.getByText(/You typed:.../))
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "laura" },
    })

    // eslint-disable-next-line jest/valid-expect
    expect(screen.getByText(/You typed:laura/))
  })
})

// describe("When the user enter some text in the input element with userEvent", () => {
//   test("should display the text in the screen", async () => {
//     //es mejor usar userEvent que fire event porque imita el browser event more closely than the verb api
//     render(<App />)
//     await waitFor(() => expect(getUser).toHaveBeenCalled())

//     // eslint-disable-next-line jest/valid-expect
//     expect(screen.getByText(/You typed:.../))
//     await userEvent.type(screen.getByRole("textbox"), "Laura")

// // eslint-disable-next-line jest/valid-expect
// expect(screen.getByText(/You typed:Laura/))
// })
// })
