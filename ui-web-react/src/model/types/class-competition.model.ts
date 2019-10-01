export type ClassCompetition = "125cm3" | "250cm3" | "500cm3";

export function getClassCompetitionName(сс: ClassCompetition): string {
  switch (сс) {
    case "125cm3":
      return "125 см куб";
    case "250cm3":
      return "250 см куб";
    case "500cm3":
      return "500 см куб";
    default:
      return "Неизветсный класс";
  }
}
