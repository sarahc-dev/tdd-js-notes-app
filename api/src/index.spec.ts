import request from "supertest";
import app, { server } from "./index";

afterAll(() => {
    server.close();
});

describe("Todolist API", () => {
    it("GET /todos returns an array of all todos", () => {
        return request(app)
            .get("/todos")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            todo: expect.any(String),
                            completed: expect.any(Boolean),
                        }),
                    ])
                );
            });
    });
});
