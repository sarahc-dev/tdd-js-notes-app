import IconButton from "./IconButton";
import { IconType } from "react-icons";
import "@/app/globals.css";

describe("<DeleteButton />", () => {
    const MockIcon: IconType = () => {
        return <div>Delete Button</div>;
    };

    it("renders the button with correct properties", () => {
        const handleDelete = cy.stub();
        cy.mount(<IconButton action="delete" Icon={MockIcon} handleClick={handleDelete} />);
        cy.get('[data-cy="delete"]').should("exist");
        cy.get('[data-cy="delete"]').contains("Delete Button");
        cy.get("[data-cy='delete'] span").contains("delete").and("have.class", "sr-only");
    });

    context("when the user clicks on the button", () => {
        it("calls the handleClick callback", () => {
            const handleDelete = cy.stub().as("handleDelete");
            cy.mount(<IconButton action="delete" Icon={MockIcon} handleClick={handleDelete} />);
            cy.get('[data-cy="delete"]').click();
            cy.get("@handleDelete").should("have.been.called");
        });
    });
});
