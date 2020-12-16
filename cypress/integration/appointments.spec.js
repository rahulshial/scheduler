describe("Navigation", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("should book an interview", () => {
/**Visits the root of our web server
 * Clicks on the "Add" button in the second appointment
 * Enters their name
 * Chooses an interviewer
 * Clicks the save button
 * Sees the booked appointment 
 */
   cy.get("[alt=Add]")
   .first()
   .click();  
  cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones')
  cy.get('[alt="Sylvia Palmer"]').click();
  cy.contains('Save').click();
  cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    /**Visits the root of our web server
     * Clicks the edit button for the existing appointment
     * Changes the name and interviewer
     * Clicks the save button
     * Sees the edit to the appointment
     */
  
    cy.get("[alt=Edit]").first().click({ force: true })
    cy.get('[data-testid=student-name-input]').clear().type('Lydia Miller-Jones')
    cy.get('[alt="Tori Malcolm"]').click();
    cy.contains('Save').click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
  cy.get("[alt=Delete]")
    .click({ force: true });

  cy.contains("Confirm").click();

  cy.contains("Cancelling Appointment").should("exist");
  cy.contains("Cancelling Appointment").should("not.exist");

  cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});