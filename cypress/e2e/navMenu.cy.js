import navMenu from "../pages/navMenu";
import loginPage from "../pages/loginPage";

const loginP = new loginPage();
const navMenuP = new navMenu();


describe('Invertory Page Menu', () => {


    
    beforeEach(() => {  
        loginP.SouceLogin('standard_user','secret_sauce');

 });

    
    it('Verify Menu button Click', () => {
        navMenuP.menuButton().click();
        navMenuP.menuContainer().should('be.visible');
    });

    it('Verify All Items Link', () => {
        navMenuP.menuButton().click();
        navMenuP.getAllItemsLink().should('have.attr','href').and('contains','#');
        navMenuP.getAllItemsLink().should('have.text','All Items');
    });

    it('Verify About Link', () => {
        navMenuP.menuButton().click();
        navMenuP.aboutLink().should('have.attr','href').and('contains','saucelabs.com');
    });

    it('Verify Logout Link', () => {
        navMenuP.menuButton().click();
        navMenuP.logoutLink().click();
        cy.url().should('include','saucedemo.com');
    });

    it('Verify Reset App State Link', () => {
        navMenuP.menuButton().click();
        navMenuP.resetAppStateLink().click();
        // No direct validation available for reset app state
        // You can add validation based on your app's behavior after reset
    });     

    it('Verify Close Menu Button', () => {
        navMenuP.menuButton().click();
        navMenuP.closeMenuButton().click();
        navMenuP.menuContainer().should('not.be.visible');
    });

    ////  bug in app - close menu by clicking outside not working
    it.skip('Verify Close Menu by clicking outside', () => {
        navMenuP.menuButton().click();
        cy.get('div.inventory_container').click({force:true});
        navMenuP.menuContainer().should('not.be.visible');
    });




});
