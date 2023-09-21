describe("todolist app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:8080/test/deleteAll");
        cy.visit("http://localhost:3000");
    });

    it("adds a new todo", () => {
        cy.contains("TODO");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todos"]').should("contain", "New todo");
        cy.get('[data-cy="todo-input"]').should("have.value", "");
    });

    it("marks a todo as complete", () => {
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
    });
});
