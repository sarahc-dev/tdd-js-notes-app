import Checkbox from "./Checkbox";
import "@/app/globals.css";

describe("<Checkbox />", () => {
    context("when the user clicks on the checkbox", () => {
        it("calls the markAsComplete callback", () => {
            const markAsComplete = cy.stub().as("markAsComplete");
            cy.mount(<Checkbox toggleCheckbox={markAsComplete} complete={false} />);
            cy.get('[data-cy="checkbox"]').click();
            cy.get("@markAsComplete").should("have.been.called");
        });
    });

    context("when the item is complete", () => {
        it("displays a checkmark", () => {
            const markAsComplete = cy.stub();
            cy.mount(<Checkbox toggleCheckbox={markAsComplete} complete={true} />);
            cy.get('[data-cy="checkbox"]').should("have.descendants", "svg");
        });

        it("displays correct screenreader text", () => {
            const markAsComplete = cy.stub();
            cy.mount(<Checkbox toggleCheckbox={markAsComplete} complete={true} />);
            cy.get("button span").contains("Mark as incomplete").and("have.class", "sr-only");
        });
    });

    context("when the item is incomplete", () => {
        it("displays an empty circle", () => {
            const markAsComplete = cy.stub();
            cy.mount(<Checkbox toggleCheckbox={markAsComplete} complete={false} />);
            cy.get('[data-cy="checkbox"]').should("not.have.descendants", "svg");
        });

        it("displays correct screenreader text", () => {
            const markAsComplete = cy.stub();
            cy.mount(<Checkbox toggleCheckbox={markAsComplete} complete={false} />);
            cy.get("button span").contains("Mark as complete").and("have.class", "sr-only");
        });
    });
});
