import { getRaceStateName, RaceState } from "../../../model/types/races.model";

describe("races.model", () => {
  it("should return correct human readable names", () => {
    expect(getRaceStateName(RaceState.NOT_STARTED)).toEqual("Не началась");
    expect(getRaceStateName(RaceState.STARTED)).toEqual("Началась");
    expect(getRaceStateName(RaceState.STOPPED)).toEqual("Остановлена");
    expect(getRaceStateName(RaceState.FINISHED)).toEqual("Закончена");
  });
});
