import { getUser } from "./get-user"

describe("when everything is ok", () => {
  test("should reurn a response", async () => {
    const result = await getUser()
    expect(result).toEqual({ id: 1, name: "laura" })
  })
})
