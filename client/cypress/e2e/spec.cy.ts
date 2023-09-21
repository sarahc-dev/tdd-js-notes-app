describe("todolist app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:8080/test/deleteAll");
    });

    it("adds a new todo", () => {
        cy.visit("http://localhost:3000");
        cy.contains("TODO");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todos"]').should("contain", "New todo");
    });
});
