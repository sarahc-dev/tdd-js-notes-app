import { getDbUrl } from "./dbConnection";

describe("Database URL configuration", () => {
    it("should use the test database when NODE_ENV='test'", () => {
        const dbUrl = getDbUrl();
        expect(dbUrl).toBe("mongodb://0.0.0.0/todolist_test");
    });

    it("should use the todolist database when NODE_ENV='production", () => {
        process.env.NODE_ENV = "production";
        const dbUrl = getDbUrl();
        expect(dbUrl).toBe("mongodb://0.0.0.0/todolist");
    });
});
