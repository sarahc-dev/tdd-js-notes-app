import request from "supertest";
import app, { server, getDbUrl } from "./index";
import Todo from "./models/todoModel";
import mongoose from "mongoose";

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
            .expect("Content-Type", /json/)
            .expect(200)
           
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("_id");
        expect(response.body[0].title).toBe("Feed cat");
        expect(response.body[0].completed).toBe(false);
    });
  
    it("GET /todos returns an empty array when there are no todos", async () => {
        const response = await request(app)
            .get("/todos")
            .expect("Content-Type", /json/)
            .expect(200)
            
        expect(response.body).toHaveLength(0)
    });

    it("GET /todos returns a 500 status error if cannot get todos", async () => {
        const findSpy = jest.spyOn(Todo, 'find');
        findSpy.mockImplementation(() => {
            throw new Error('Simulated error')
        })
     
        const response = await request(app)
        .get("/todos")
        .expect("Content-Type", /json/)
        .expect(500)

        expect(response.body).toEqual({ error: "Internal server error" })

        findSpy.mockRestore()
    })
});

describe("Database URL configuration", () => {
    it("should use the test database when NODE_ENV='test'", () => {
        const dbUrl = getDbUrl()
        expect(dbUrl).toBe("mongodb://0.0.0.0/todolist_test")
    })

    it("should use the todolist database when NODE_ENV='production", () => {
        process.env.NODE_ENV = 'production'
        const dbUrl = getDbUrl()
        expect(dbUrl).toBe("mongodb://0.0.0.0/todolist")
    })
})
