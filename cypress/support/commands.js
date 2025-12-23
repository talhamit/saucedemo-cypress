// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loginPage from "../pages/loginPage";
const loginP = new loginPage();

//gemini
Cypress.Commands.add('loginSession', () => {
  cy.session('SauceSession', () => {
    // This part only runs if the session isn't cached
    cy.visit('/');
    loginP.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  }, {
    validate() {
      // Verify the session is still active by checking for the cookie
      // SauceDemo sets a cookie named 'session-username'
      cy.getCookie('session-username').should('exist');
    }
  });
});


Cypress.Commands.add('getByTest', (selector) => {
  return cy.get(`[data-test="${selector}"]`)
})



// Cypress.Commands.add('loginSession', () => {

//   cy.session('SauceSession', () => {
//       cy.visit('/');
//       loginP.login('standard_user','secret_sauce');

//       cy.url().should('include', '/inventory.html');
//     }, {
//     validate() {
//       // Check for the session cookie SauceDemo uses
//       cy.getCookie('session-username').should('exist');
//     },
//     cacheAcrossSpecs: true});

// });


//     const loginP = new loginPage();

//     Cypress.Commands.add('loginSession',(userType = 'validUser')=>{

//         // console.log('Logging in as:',users[userType].username);
//         // console.log('Using password:',users[userType].password);

//         cy.session(userType,()=>{
//         loginP.visit('/');
//         loginP.login(
//             users[userType].username,
//             users[userType].password
//         );
//        cy.url().should('include', '/inventory.html'); // ensure login success
//         },
//     {
//       validate() {
//         cy.getCookie('session-username').should('exist');
//       }
//     });
//     })



// Cypress.Commands.add('LoginSession',(userType='validUser')=>{

//     const user = user[userType];
//     cy.session([user.username,user.password],()=>{
//     cy.visit('https://www.saucedemo.com/');
//     cy.get('[data-test="username"]').type(user.username);
//     cy.get('[data-test="password"]').type(user.password);
//     cy.get('[data-test="login-button"').click();
//     //cy.url().should('include', '/inventory.html'); // ensure login success


//     })

// })