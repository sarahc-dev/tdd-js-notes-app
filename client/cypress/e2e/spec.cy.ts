describe("todolist app", () => {
    it("adds a new todo", () => {
        cy.visit("http://localhost:3000");
        cy.contains("TODO");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click;
        cy.get('[data-cy="todos"]').should("have.length", 2);
        cy.get('[data-cy="todos"]').contains("New todo");
    });
});
