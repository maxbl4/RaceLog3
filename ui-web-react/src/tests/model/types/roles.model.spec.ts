import { getRoleName, Role, canSeeSpecialContent } from "../../../model/types/roles.model";

describe("roles.model", () => {
  it("should return correct human readable names", () => {
    expect(getRoleName(Role.ADMIN)).toEqual("Администратор");
    expect(getRoleName(Role.SUPPORT)).toEqual("Тех поддержка");
    expect(getRoleName(Role.USER)).toEqual("Пользователь");
  });

  it("whether can see special content based on role", () => {
    expect(canSeeSpecialContent(Role.ADMIN)).toBeTruthy();
    expect(canSeeSpecialContent(Role.SUPPORT)).toBeTruthy();
    expect(canSeeSpecialContent(Role.USER)).toBeFalsy();
  });
});
