import { getRoleName } from "./roles.model";

describe("roles.model", () => {
  it("should return correct human readable names", () => {
    expect(getRoleName("admin")).toEqual("Администратор");
    expect(getRoleName("supporter")).toEqual("Тех поддержка");
    expect(getRoleName("user")).toEqual("Пользователь");
  });
});
