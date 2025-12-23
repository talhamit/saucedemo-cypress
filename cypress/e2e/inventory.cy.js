import inventory from "../pages/inventory";
import loginPage from "../pages/loginPage";

const loginP = new loginPage();

const inventoryP = new inventory();

describe('Invertory Page Tests', () => {

    beforeEach(() => {
    
        loginP.SouceLogin('standard_user','secret_sauce');

    }); 

    it('Verify Page Title on Inventory Page', () => {

        cy.url().should('include','inventory.html');
        inventoryP.getPageTitle().should('have.text','Products');    
    });

    it('Verify Items Count on Inventory Page', () => {

        cy.getByTest('inventory-item').should('have.length',6);    
    });

    it('Verify First Item Name on Inventory Page', () => {

        cy.getByTest('inventory-item-name').first().should('have.text','Sauce Labs Backpack');

    });

    it('Verify Last Item Name on Inventory Page', () => {

        cy.getByTest('inventory-item-name').last().should('have.text','Test.allTheThings() T-Shirt (Red)'); 

    });


    it('Add First Item to Cart', () => {

        cy.getByTest('add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text','1'); 
    });

    it('Add All Items to Cart', () => {

        cy.get('button.btn_inventory').each(($el) => {
        cy.wrap($el).click();
        } );
        cy.get('.shopping_cart_badge').should('have.text','6');
    });

    it('Remove First Item from Cart', () => {

        cy.getByTest('add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text','1'); 
        cy.getByTest('remove-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('not.exist'); 
    });

    it('Remove All Items from Cart', () => {

        cy.get('button.btn_inventory').each(($el) => {
            cy.wrap($el).click();
        } );
        cy.get('.shopping_cart_badge').should('have.text','6');

        cy.get('button.btn_inventory').each(($el) => {
            cy.wrap($el).click();
        } );

        cy.get('.shopping_cart_badge').should('not.exist');
    });

});