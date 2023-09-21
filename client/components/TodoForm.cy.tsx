import TodoForm from "./TodoForm";

describe("<TodoForm />", () => {
    context("when the user enters a todo", () => {
        it("calls the onSubmit callback with the todo", () => {
            const onSubmit = cy.stub().as("onSubmit");
            cy.mount(<TodoForm onSubmit={onSubmit} />);
            cy.get('[data-cy="todo-input"]').type("New todo");
            cy.get('[data-cy="todo-submit"]').click();
            cy.get("@onSubmit").should("have.been.calledWith", "New todo");
            cy.get('[data-cy="todo-input"]').should("have.value", "");
        });
    });
});
