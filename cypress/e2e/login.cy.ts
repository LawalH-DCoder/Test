describe('Login', () => {
  beforeEach(() => cy.visit('/login'));
  it('redirects student to /student/dashboard', () => {
    cy.get('[data-testid="login-email-input"]').type('jumoke.adebayo@student.academy.com');
    cy.get('[data-testid="login-password-input"]').type('Student123!');
    cy.get('[data-testid="login-submit-button"]').click();
    cy.url().should('include', '/student/dashboard');
  });
  it('redirects admin to /admin/dashboard', () => {
    cy.get('[data-testid="login-email-input"]').type('admin@academy.com');
    cy.get('[data-testid="login-password-input"]').type('Admin1234!');
    cy.get('[data-testid="login-submit-button"]').click();
    cy.url().should('include', '/admin/dashboard');
  });
  it('shows error message for wrong credentials', () => {
    cy.intercept('GET', '**/users?email=*', { body: [] }); // no match
    cy.get('[data-testid="login-email-input"]').type('wrong@gmail.com');
    cy.get('[data-testid="login-password-input"]').type('wrongpass');
    cy.get('[data-testid="login-submit-button"]').click();
    cy.get('[data-testid="login-error"]').should('be.visible');
  });
});