import { normalizeApod } from "@/lib/nasa";

describe("normalizeApod", () => {
  it("normalizes a well-formed image response", () => {
    const result = normalizeApod({
      date: "2024-01-01",
      title: "A Nebula",
      explanation: "A very large cloud of gas.",
      url: "https://apod.nasa.gov/apod/image/2401/nebula.jpg",
      hdurl: "https://apod.nasa.gov/apod/image/2401/nebula_hd.jpg",
      media_type: "image",
      copyright: "Jane Astronomer",
      service_version: "v1",
    });

    expect(result).toEqual({
      date: "2024-01-01",
      title: "A Nebula",
      explanation: "A very large cloud of gas.",
      url: "https://apod.nasa.gov/apod/image/2401/nebula.jpg",
      hdurl: "https://apod.nasa.gov/apod/image/2401/nebula_hd.jpg",
      mediaType: "image",
      copyright: "Jane Astronomer",
      serviceVersion: "v1",
    });
  });

  it("defaults an unrecognized media_type to image", () => {
    const result = normalizeApod({
      date: "2024-01-01",
      title: "Mystery",
      explanation: "Unknown format.",
      url: "https://example.com/mystery",
      media_type: "something-else",
    });

    expect(result.mediaType).toBe("image");
  });

  it("normalizes a video response", () => {
    const result = normalizeApod({
      date: "2024-01-01",
      title: "A Launch",
      explanation: "Rocket goes up.",
      url: "https://www.youtube.com/embed/xyz",
      media_type: "video",
    });

    expect(result.mediaType).toBe("video");
  });

  it("throws on a response missing required fields", () => {
    expect(() =>
      normalizeApod({
        date: "",
        title: "",
        explanation: "",
        url: "",
        media_type: "image",
      }),
    ).toThrow();
  });
});
