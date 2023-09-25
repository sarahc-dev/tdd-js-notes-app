import TodoItem from "../../components/TodoItem";
import "@/app/globals.css";

describe("<TodoItem />", () => {
    it("displays the todo item", () => {
        const todo = {
            _id: "1",
            title: "New todo",
            completed: false,
        };

        cy.mount(<TodoItem todo={todo} />);
        cy.get("li").should("include.text", "New todo").and("not.have.class", "line-through");
    });

    it("displays the todo with line-through if it is completed", () => {
        const todo = {
            _id: "1",
            title: "New todo",
            completed: true,
        };

        cy.mount(<TodoItem todo={todo} />);
        cy.get("li").should("include.text", "New todo").and("have.class", "line-through");
    });
});
