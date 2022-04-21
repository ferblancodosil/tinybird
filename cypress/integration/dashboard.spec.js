describe('Modify params in dashboard', () => {
  it('The dashboard apply filter and change url with the params', () => {
    cy.visit('/')
    cy.get('#tpep_pickup_datetime')
      .type('2017-01-19')
    cy.get('#tpep_pickup_datetime_btn').click()
    cy.url().should('include', 'filters=toDate%28tpep_pickup_datetime%29+%3D+%272017-01-19%27')
    cy.url().should('include', 'tpep_pickup_datetime=2017-01-19')
  })

  it('In the dashboard layout should exist 4 tables', () => {
    cy.visit('/')
    cy.get('.tinytable').should('have.length', 4)
  })
})
