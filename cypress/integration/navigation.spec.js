describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to 'Tuesday'", () => {
    cy.visit("/");

    /** Method 1 */
    // cy
    // .get("li")
    // .contains("Tuesday").click()
    // cy.contains("li", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)")
    
    /** Method 2 */
    // cy
    // .contains("li", "Tuesday")
    // .click()
    // .should("have.css", "background-color", "rgb(242, 242, 242)")
    
    /** Method 3 */
    // cy
    // .contains("[data-testid=day]", "Tuesday")
    // .click()
    // .should("have.css", "background-color", "rgb(242, 242, 242)")

    /** Method 4 */
    cy
    .contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  });
});