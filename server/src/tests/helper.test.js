import { clean_url, http_url } from "../helper";

test("removes everything but the base url", () => {
    expect(clean_url("https://jestjs.io/docs/getting-started")).toBe("jestjs.io");
    expect(clean_url("https://github.com/michaeljsXu/url_shorten/blob/main/client/src/App.tsx")).toBe("github.com");
    expect(clean_url("google.com:5050/hello")).toBe("google.com");
});