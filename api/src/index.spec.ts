import request from "supertest";
import app from "./index";

describe("Todolist API", () => {
    it("GET /todos returns an array of all todos", () => {
        return request(app).get("/todos").expect("Content-Type", /json/).expect(200);
    });
});
