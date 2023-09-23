describe("todolist app", () => {
    beforeEach(() => {
        cy.intercept("http://localhost:8080/todos").as("todos");
        cy.request("POST", "http://localhost:8080/test/deleteAll");
        cy.visit("http://localhost:3000");
        cy.wait("@todos");
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
        cy.get('[data-cy="todos"]').should("contain", "New todo");
        cy.get('[data-cy="checkbox"]').click();
        cy.get('[data-cy="checkbox"]').should("have.descendants", "svg");
        cy.get('[data-cy="todos"] li').should("have.class", "line-through");
    });
});
