import { getRoleName, Role } from "../../../model/types/roles.model";

describe("roles.model", () => {
  it("should return correct human readable names", () => {
    expect(getRoleName(Role.ADMIN)).toEqual("Администратор");
    expect(getRoleName(Role.SUPPORT)).toEqual("Тех поддержка");
    expect(getRoleName(Role.USER)).toEqual("Пользователь");
  });
});
