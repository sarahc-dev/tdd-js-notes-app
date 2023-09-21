import TodoList from "./TodoList";

describe("<TodoList />", () => {
    it("contains a list of todo components", () => {
        const todoItems = [
            {
                _id: "1",
                title: "New todo",
                completed: false,
            },
            {
                _id: "2",
                title: "Feed cat",
                completed: false,
            },
        ];
        cy.mount(<TodoList items={todoItems} />);
        cy.get("ul").children().should("have.length", 2);
    });

    it("displays a message when there are no todos", () => {
        cy.mount(<TodoList items={[]} />);
        cy.contains("There's nothing to do.");
    });
});
