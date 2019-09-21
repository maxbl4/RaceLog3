export type Role = "admin" | "supporter" | "user";

export function getRoleName(role: Role): string {
  switch (role) {
    case "admin":
      return "Администратор";
    case "supporter":
      return "Тех поддержка";
    case "user":
      return "Пользователь";
    default:
      return "Неизветсная роль";
  }
}
