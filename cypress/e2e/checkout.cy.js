import cartPage from "../pages/cart";
import loginPage from "../pages/loginPage";
import inventory from "../pages/inventory";
import checkoutPage from "../pages/checkout";


const loginP = new loginPage(); 
const cartP = new cartPage();
const inventoryP = new inventory();
const checkoutP = new checkoutPage();

describe("Checkout Page Tests", ()=>{

    beforeEach(() => {
        loginP.SouceLogin('standard_user','secret_sauce');

    });


    it('Verify Checkout Button Visibility', () => {
        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().should('be.visible');
    });

    it('Verify Checkout Button Enabled', () => {
        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().should('be.enabled');
    });

    it('Verify Checkout Button Disabled Negative Test', () => {
        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().should('not.be.disabled');
    });

    it('Verify Checkout Button Text', () => {
        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().should('have.text','CHECKOUT');
    });

    it('Verify Checkout Button Text Negative Test', () => {
        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().should('not.have.text','CHECKOUT123');
    });

    it('Verify Checkout Button Count', () => {
        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().its('length').should('eq',1);
    });


    it('Verify Checkout Button Functionality', () => {

        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().click();
        cy.url().should('include','checkout-step-one.html');
    });

    it('Verify Checkout Page Title', () => {

        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().click();
        cy.url().should('include','checkout-step-one.html');
        checkoutP.checkOutTitle().should('have.text','Checkout: Your Information');
    });

    
    it('Verify Checkout Page Title Negative Test', () => {
        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        checkoutP.checkOutBtn().click();
        cy.url().should('include','checkout-step-one.html');
        checkoutP.checkOutTitle().should('not.have.text','Checkout: Your Information123');
    });

    
    

});