import React from "react"
import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByTestId,
  getByRole,
} from "@testing-library/react"
import App from "./App"
import { getUser } from "./get-user"
import userEvent from "@testing-library/user-event"
import CustomInput from "./CustomInput"

describe("When everything is Ok", () => {
  test("should call the onchange callback handler when using the fireeVENT function", () => {
    const onChange = jest.fn()
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    )

    fireEvent.change(screen.getByTestId("custom-input"), {
      target: { value: "Laura" },
    })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
  test("should call the onchange callback handler when using the useEvent function", async () => {
    const onChange = jest.fn()
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    )

    await userEvent.type(screen.getByTestId("custom-input"), "Laura")
    expect(onChange).toHaveBeenCalledTimes(5)
  })
  //   correr tests npm run test -- --coverage --watchAll=false
})
