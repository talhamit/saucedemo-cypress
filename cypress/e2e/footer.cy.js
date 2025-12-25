import loginPage from "../pages/loginPage";
import footer from "../pages/footer";

const loginP = new loginPage();
const footerP = new footer();

describe('Footer Tests', () => {

    beforeEach(() => {  
        loginP.SouceLogin('standard_user','secret_sauce');
 }
    );  

    it('Verify Footer Container is Visible', () => {
        footerP.footerContainer().should('be.visible');
    });

    it('Verify Footer Link', () => {

        const footerLink = [
            'https://twitter.com/saucelabs',
            'https://www.facebook.com/saucelabs',
            'https://www.linkedin.com/company/sauce-labs/'
        ];

        
    cy.get('.social li').each(($el,index) =>{
        cy.wrap($el).find('a').should('have.attr','href').and('contains',footerLink[index]);

    });
    
});

it('Verify Footer Text', () => {
    footerP.footerText().should('have.text','© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');   

});




});
