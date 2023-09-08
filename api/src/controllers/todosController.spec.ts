import request from "supertest";
import app from "../index";
import databaseConnection from "../dbConnection";
import Todo from "../models/todoModel";
import { Connection } from "mongoose";

let db: Connection;
beforeAll(() => {
    db = databaseConnection();
});

afterEach(async () => {
    await Todo.deleteMany({});
});

afterAll(async () => {
    await Todo.collection.drop();
    await db.close();
});

describe("Todolist API", () => {
    it("GET /todos returns an array of all todos", async () => {
        await new Todo({ title: "Feed cat" }).save();
        const response = await request(app).get("/todos").expect("Content-Type", /json/).expect(200);

        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("_id");
        expect(response.body[0].title).toBe("Feed cat");
        expect(response.body[0].completed).toBe(false);
    });

    it("GET /todos returns an empty array when there are no todos", async () => {
        const response = await request(app).get("/todos").expect("Content-Type", /json/).expect(200);

        expect(response.body).toHaveLength(0);
    });

    it("GET /todos returns a 500 status error if cannot get todos", async () => {
        const findSpy = jest.spyOn(Todo, "find");
        findSpy.mockImplementation(() => {
            throw new Error("Simulated error");
        });

        const response = await request(app).get("/todos").expect("Content-Type", /json/).expect(500);

        expect(response.body).toEqual({ error: "Internal server error" });

        findSpy.mockRestore();
    });

    it("POST /todos adds a new todo", async () => {
        const newTodo = { title: "Make a cake" };
        const response = await request(app).post("/todos").send(newTodo).expect(201);

        expect(response.body).toHaveProperty("_id");
        expect(response.body.title).toBe("Make a cake");
        expect(response.body.completed).toBe(false);
    });

    it("POST /todos returns a 500 status error if cannot add todo", async () => {
        const newTodo = new Todo({});

        const response = await request(app).post("/todos").send(newTodo).expect(500);

        expect(response.body).toEqual({ error: "Internal server error" });
    });
});
