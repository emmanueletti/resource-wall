const request = require("supertest");
const server = require("../server");

describe("server", () => {
  before(() => {
    require("../bin/resetdb");
  });
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
        .expect(200)
        .end(done);
    });
    it("returns an array of resources on GET to /search for a given user name, case-insensitive", (done) => {
      agent
        .get("/api/resources/search?u=tEst")
        .expect(200)
        .expect((res) => {
          if (!res.body[0].avg_rating || !res.body[0].likes)
            throw new Error("Assertion failed");
        })
        .end(done);
    });
    it("returns the resource data on GET to /:id", (done) => {
      agent
        .get("/api/resources/42")
        .expect(200)
        .expect((res) => {
          if (
            res.body[0].res_id !== 42 ||
            !res.body[0].avg_rating ||
            !res.body[0].likes
          )
            throw new Error("FAIL");
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
    it("returns an array of categories for the signed-in user on GET", (done) => {
      agent
        .get("/api/categories")
        .expect(200)
        .expect((res) => {
          if (res.body.every(({ name }) => name === res.body[0].name))
            throw new Error("Trouble on GET to /api/categories");
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
    it("returns an array of comments on GET to /search for a given resource_id", (done) => {
      agent
        .get("/api/comments/search?res=42")
        .expect(200)
        .expect((res) => {
          const sample = res.body[0];
          if (!sample.content || !sample.user_name) throw new Error("FAIL");
        })
        .end(done);
    });
  });
  describe("/api/ratings", () => {
    it("creates a new rating on POST, returns an array of ratings for the resource", (done) => {
      agent
        .post("/api/ratings")
        .send({ resource_id: 39, value: 3 })
        .expect(200)
        .expect((res) => {
          if (
            res.body.some(({ resource_id }) => resource_id !== 39) ||
            res.body.every(({ user_id }) => user_id === res.body[0].user_id)
          )
            throw new Error("Trouble on POST to /api/ratings");
        })
        .end(done);
    });
    it("updates the rating on PUT, returns an array of ratings for the resource", (done) => {
      agent
        .put("/api/ratings")
        .send({ resource_id: 39, value: 5 })
        .expect(200)
        .expect((res) => {
          if (
            res.body.some(({ resource_id }) => resource_id !== 39) ||
            res.body.every(({ user_id }) => user_id === res.body[0].user_id) ||
            !res.body.some(
              ({ resource_id, user_id, value }) =>
                resource_id === 39 && user_id === 1 && value === 5
            )
          )
            throw new Error("Trouble on PUT to /api/ratings");
        })
        .end(done);
    });
  });
  describe("/api/likes", () => {
    it("creates a new like on POST to /likes, returns an array of likes for the resource", (done) => {
      agent
        .post("/api/likes")
        .send({ resource_id: 30 })
        .expect(200)
        .expect((res) => {
          if (
            res.body.some(({ resource_id }) => resource_id !== 30) ||
            res.body.every(({ user_id }) => user_id === res.body[0].user_id)
          )
            throw new Error("Trouble on POST to /api/likes");
        })
        .end(done);
    });
    it("deletes the like on DELETE to /likes, returns an array of likes for the resource", (done) => {
      agent
        .delete("/api/likes")
        .send({ resource_id: 30 })
        .expect(200)
        .expect((res) => {
          if (
            res.body.some(({ user_id }) => user_id === 30) ||
            res.body.every(({ user_id }) => user_id === res.body[0].user_id)
          )
            throw new Error("Trouble on DELETE to /api/likes");
        })
        .end(done);
    });
    it("returns an array of liked resources on GET to /search for the given user_id", (done) => {
      agent
        .get("/api/likes/search?u=5")
        .expect(200)
        .expect((res) => {
          if (!Array.isArray(res.body) || res.body[0].user_id !== 5)
            throw new Error("FAIL");
        })
        .end(done);
    });
    it("returns an array of likes on GET to /search for the given res_id", (done) => {
      agent
        .get("/api/likes/search?res=20")
        .expect(200)
        .expect((res) => {
          if (
            res.body.some(({ resource_id }) => resource_id !== 20) ||
            res.body.every(({ user_id }) => user_id === res.body[0].user_id)
          )
            throw new Error("Check /likes/search?res");
        })
        .end(done);
    });
  });
  describe("/mywall", () => {
    it("returns a list of created and liked resources for the logged-in user", (done) => {
      agent
        .get("/mywall")
        .expect(200)
        .expect((res) => {
          if (res.body.every((e) => e.auth_id === res.body[0].auth_id))
            throw new Error("Oh noes! All auth_ids are the same!");
        })
        .end(done);
    });
  });
  describe("/api/userinfo", () => {
    it("returns user data for the logged-in user", (done) => {
      agent
        .get("/api/userinfo")
        .expect(200)
        .expect((res) => {
          if (!res.body[0].name) throw new Error("FAIL");
        })
        .end(done);
    });
  });
  describe("/api/users", () => {
    it("return an array of objects with user names on GET", (done) => {
      agent
        .get("/api/users")
        .expect(200)
        .expect((res) => {
          if (!res.body[0].user_name)
            throw new Error("No user_name for GET /users");
        })
        .end(done);
    });
  });
});
