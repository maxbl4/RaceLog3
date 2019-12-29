export enum Role {
  ADMIN = 1,
  SUPPORT = 2,
  USER = 3
}

export function getRoleName(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return "Администратор";
    case Role.SUPPORT:
      return "Тех поддержка";
    case Role.USER:
      return "Пользователь";
    default:
      return "Неизвестная роль";
  }
}
