export enum RaceState {
  NOT_STARTED,
  STARTED,
  STOPED,
  FINISHED
}

export function getRaceStateName(state: RaceState): string {
  switch (state) {
    case RaceState.NOT_STARTED:
      return "Не началась";
    case RaceState.STARTED:
      return "Началась";
    case RaceState.STOPED:
      return "Остановлена";
    case RaceState.FINISHED:
      return "Закончена";
    default:
      return "Неизвестное состояние";
  }
}
