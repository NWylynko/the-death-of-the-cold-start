import { hello } from "./hello";

test("Returns hello to name passed", async () => {
  expect(await hello("bob")).toStrictEqual({ hello: "bob" });
});
