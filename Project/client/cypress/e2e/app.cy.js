describe('Book Management App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page with site name and logo', () => {
    cy.contains('Book Management App').should('be.visible');
  });

  it('should navigate to different pages', () => {
    // Navigate to Books page
    cy.contains('Books').click();
    cy.url().should('include', '/books');

    // Navigate to Home page
    cy.contains('Home').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should show sign up and sign in links when not logged in', () => {
    cy.contains('Sign Up').should('be.visible');
    cy.contains('Sign In').should('be.visible');
  });

  it('should navigate to sign up page', () => {
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
    cy.contains('Sign Up').should('be.visible');
  });

  it('should navigate to sign in page', () => {
    cy.contains('Sign In').click();
    cy.url().should('include', '/signin');
    cy.contains('Sign In').should('be.visible');
  });

  it('should display book list', () => {
    cy.contains('Book List').should('be.visible');
  });
});
