import { getClassCompetitionName } from "./class-competition.model";

describe("class-competition.model", () => {
  it("should return correct human readable names", () => {
    expect(getClassCompetitionName("125cm3")).toEqual("125 см куб");
    expect(getClassCompetitionName("250cm3")).toEqual("250 см куб");
    expect(getClassCompetitionName("500cm3")).toEqual("500 см куб");
  });
});
