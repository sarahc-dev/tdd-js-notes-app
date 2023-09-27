describe("todolist app", () => {
    beforeEach(() => {
        cy.intercept("http://localhost:8080/api/todos").as("todos");
        cy.request("POST", "http://localhost:8080/api/test/deleteAll");
        cy.visit("http://localhost:3000");
    });

    it("displays a loading icon while fetching todos", () => {
        cy.get('[aria-label="oval-loading"]').should("be.visible");
        cy.contains("There's nothing to do.").should("not.exist");
        cy.get('[data-cy="todos"]').should("not.exist");
        cy.wait("@todos");
        cy.contains("There's nothing to do.");
    });

    it("adds a new todo", () => {
        cy.contains("TODO");
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todos"]').should("contain", "New todo");
        cy.get('[data-cy="todo-input"]').should("have.value", "");
    });

    it("marks a todo as complete", () => {
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todos"]').should("contain", "New todo");
        cy.get('[data-cy="checkbox"]').click();
        cy.get('[data-cy="checkbox"]').should("have.descendants", "svg");
        cy.get('[data-cy="todos"] li').should("have.class", "line-through");
    });

    it("deletes a todo", () => {
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("To be deleted");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todos"]').should("contain", "To be deleted");
        cy.get('[data-cy="delete"]').click();
        cy.get('[data-cy="todos"]').should("not.contain", "To be deleted");
    });

    it("edits the content of a todo", () => {
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("To edit");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="edit"]').click();
        cy.get('[data-cy="todo-edit"]').type(" edited");
        cy.get('[data-cy="confirm"]').click();
        cy.get('[data-cy="todos"]').should("contain", "edited");
    });

    it("declines the todo edit", () => {
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("To edit");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="edit"]').click();
        cy.get('[data-cy="todo-edit"]').type("New todo");
        cy.get('[data-cy="decline"]').click();
        cy.get('[data-cy="todos"]').should("not.contain", "New todo");
        cy.get('[data-cy="todos"]').should("contain", "To edit");
    });
});
