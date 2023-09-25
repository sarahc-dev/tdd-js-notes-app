import DeleteButton from "./DeleteButton";
import "@/app/globals.css";

describe("<DeleteButton />", () => {
    context("when the user clicks on the delete button", () => {
        it("calls the handleDelete callback", () => {
            const handleDelete = cy.stub().as("handleDelete");
            cy.mount(<DeleteButton handleDelete={handleDelete} />);
            cy.get('[data-cy="delete"]').click();
            cy.get("@handleDelete").should("have.been.called");
        });
    });
});
