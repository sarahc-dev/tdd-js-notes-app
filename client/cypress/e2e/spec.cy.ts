describe("todolist app", () => {
    it("adds a new todo", () => {
        cy.visit("http://localhost:3000");
        cy.contains("TODO");
        cy.get('[data-testid="todo-input"]').type("New todo");
        cy.get('[data-testid="todo-submit"]').click;
        cy.get('[data-testid="todos"]').should("have.length", 2);
        cy.get('[data-testid="todos"]').contains("New todo");
    });
});
