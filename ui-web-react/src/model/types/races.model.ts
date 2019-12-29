export enum RaceState {
  NOT_STARTED = 1,
  STARTED = 2,
  STOPPED = 3,
  FINISHED = 4
}

export function getRaceStateName(state: RaceState): string {
  switch (state) {
    case RaceState.NOT_STARTED:
      return "Не началась";
    case RaceState.STARTED:
      return "Началась";
    case RaceState.STOPPED:
      return "Остановлена";
    case RaceState.FINISHED:
      return "Закончена";
    default:
      return "Неизвестное состояние";
  }
}
