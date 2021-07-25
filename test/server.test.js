const request = require("supertest");
const server = require("../server");

describe("server", () => {
  const agent = request.agent(server);
  describe("/login/1", () => {
    it("redirects to / on GET", (done) => {
      agent.get("/login/1").expect(302, done);
    });
    it("fails on POST", (done) => {
      agent.post("/login/1").expect(404, done);
    });
  });
  describe("/api/resources", () => {
    it("generates a new resource on POST, returns the resource data", (done) => {
      agent
        .post("/api/resources")
        .send({
          url: "http://example.com/",
          title: "Example",
          description: "At example page",
        })
        .expect(200, done);
    });
    it("returns an array of resources on GET to /search for a given user_id", (done) => {
      agent
        .get("/api/resources/search?u=5")
        .expect((res) => {
          if (!Array.isArray(res.body)) {
            throw new Error("Assertion failed");
          }
        })
        .end(done);
    });
  });
});
