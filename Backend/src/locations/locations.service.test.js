const locationsService = require("./locations.service");
const locationsModel = require("./locations.model");
const { NotFoundError } = require("../custom-errors/not-found.error");

jest.mock("./locations.model");

test("Should get all locations", async () => {
  locationsModel.find.mockResolvedValue([]);
  expect(await locationsService.findAll()).toEqual([]);
  expect(locationsModel.find).toHaveBeenCalledTimes(1);
});

describe("Location FindOne", () => {
  it("Should find a location", async () => {
    const mockLocation = { _id: "639835cd66d2e8465807e711" };
    locationsModel.findById.mockResolvedValue(mockLocation);
    expect(locationsModel.findById).toHaveBeenCalledTimes(1);
    expect(await locationsService.findOne("639835cd66d2e8465807e711")).toEqual(
      mockLocation
    );
  });

  it("Should throw NotFoundError", async () => {
    const mockLocation = null;
    locationsModel.findById.mockResolvedValue(mockLocation);
    expect(
      async () => await locationsService.findOne("639835cd66d2e8465807e711")
    ).rejects.toThrowError(NotFoundError);
    expect(locationsModel.findById).toHaveBeenCalledTimes(1);
  });
});
