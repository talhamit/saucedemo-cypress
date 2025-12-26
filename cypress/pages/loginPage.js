
class loginPage{

    visit() {
        cy.visit('/');
    }

    userNameField(username){
        cy.get('[data-test="username"]').type(username);
    }

    passwordField(password){
        cy.get('[data-test="password"]').type(password);
    }

    clickLogin(){
        cy.get('[data-test="login-button"').click()
    }

    errorMessage() {
        return cy.get('[data-test="error"]');
    }


    // SouceLogin(username,password){

    //     cy.visit('/');
    //     this.userNameField(username);
    //     this.passwordField(password);
    //     this.clickLogin();

    // }

    SouceLogin(username, password) {

        cy.visit('/');
  cy.get('[data-test="username"]').clear()

  if (username) {
    cy.get('[data-test="username"]').type(username)
  }

  cy.get('[data-test="password"]').clear()

  if (password) {
    cy.get('[data-test="password"]').type(password)
  }

  cy.get('[data-test="login-button"]').click()
}


logout() {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
}
    

}

export default loginPage;