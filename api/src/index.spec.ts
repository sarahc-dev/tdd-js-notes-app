import request from "supertest";
import app, { server } from "./index";
import Todo from "./models/todoModel";

afterAll(async () => {
    server.close();
});

afterEach(async () => {
    await Todo.deleteMany({})
})

describe("Todolist API", () => {
    it("GET /todos returns an array of all todos", async () => {
        await new Todo({ title: "Feed cat" }).save()
        const response = await request(app)
            .get("/todos")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
           
            expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            title: expect.any(String),
                            completed: expect.any(Boolean),
                        }),
                    ])
                );
            });
  
    it("GET /todos returns an empty array when there are no todos", async () => {
        const response = await request(app)
            .get("/todos")
            .expect("Content-Type", /json/)
            .expect(200)
            
        expect(response.body).toHaveLength(0)
    });
});
