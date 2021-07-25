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
    it("creates a new resource on POST, returns the resource data", (done) => {
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
        .expect(200)
        .expect((res) => {
          if (!Array.isArray(res.body)) {
            throw new Error("Assertion failed");
          }
        })
        .end(done);
    });
  });
  describe("/api/categories", () => {
    it("creates a new category on POST, returns the category data", (done) => {
      agent
        .post("/api/categories")
        .send({ name: "Example Category" })
        .expect(200)
        .expect((res) => {
          if (res.body[0].name !== "Example Category")
            throw new Error("Assertion failed");
        })
        .end(done);
    });
  });
  describe("/api/categories_resources", () => {
    it("creates a new connection on POST, returns the connection data", (done) => {
      agent
        .post("/api/categories_resources")
        .send({ category_id: 2, resource_id: 42 })
        .expect(200)
        .expect((res) => {
          if (res.body[0].resource_id !== 42)
            throw new Error("Assertion failed");
        })
        .end(done);
    });
  });
  describe("/api/comments", () => {
    it("creates a new comment on POST, returns the comment data", (done) => {
      agent
        .post("/api/comments")
        .send({ resource_id: 42, content: "funky" })
        .expect(200)
        .expect((res) => {
          if (res.body[0].content !== "funky" || res.body[0].user_id !== 1)
            throw new Error("FAIL");
        })
        .end(done);
    });
  });
});
