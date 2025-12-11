describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should highlight active navigation item', () => {
    cy.visit('/books');
    cy.contains('a', 'Books').parent().should('have.class', 'active');
  });

  it('should navigate through all main pages', () => {
    // Home
    cy.contains('Home').click();
    cy.url().should('eq', 'http://localhost:3000/');

    // Books
    cy.contains('Books').click();
    cy.url().should('include', '/books');

    // Sign Up
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');

    // Sign In
    cy.contains('Sign In').click();
    cy.url().should('include', '/signin');
  });

  it('should have working navbar across all pages', () => {
    const pages = ['/', '/books', '/signup', '/signin'];
    
    pages.forEach(page => {
      cy.visit(page);
      cy.get('.navbar').should('be.visible');
      cy.get('.site-name').should('contain', 'Book Management App');
    });
  });
});
