import cartPage from "../pages/cart";
import loginPage from "../pages/loginPage";
import inventory from "../pages/inventory";


const loginP = new loginPage(); 
const cartP = new cartPage();
const inventoryP = new inventory();

describe('Cart Page Tests', () => {
    
    beforeEach(() => {
        loginP.SouceLogin('standard_user','secret_sauce');
    });

it('Verify Page Title on Cart Page', () => {
    cy.getByTest('shopping-cart-link').click();
    cy.url().should('include','cart.html');
    cartP.getCartPageTitle().should('have.text','Your Cart');
});

it('Verify Cart is Empty when no items added', () => {
    cy.getByTest('shopping-cart-link').click();
    cy.get('.cart_item').should('have.length',0);
});

it('Verify Items in Cart after adding from Inventory', () => {
    inventoryP.getFirstItemBtn().click();
    inventoryP.cartLink().click();
    cy.get('.cart_item').each(($el) =>{
        cy.wrap($el).find('.cart_quantity').should('have.text','1');

    })
});

it('Verify Cart Badge Count after adding items', () => {
    inventoryP.getFirstItemBtn().click();
    inventoryP.cartBadge().should('have.text','1');
});

it('Verify Removing Item from Cart', () => {
    inventoryP.getFirstItemBtn().click();
    inventoryP.cartLink().click();
    cy.url().should('include','cart.html');
    cartP.cartRemoveButton().click();
    inventoryP.cartBadge().should('not.exist');
});


it('Verify Continue Shopping Button on Cart Page', () => {
    inventoryP.getFirstItemBtn().click();
    inventoryP.cartLink().click();
    cy.getByTest('continue-shopping').click();
    cy.url().should('include','inventory.html');
});

it('Verify Checkout Button on Cart Page', () => {
    inventoryP.getFirstItemBtn().click();
    inventoryP.cartLink().click();
    cy.getByTest('checkout').should('exist').and('have.text','Checkout');

});

it('Verify Adding Multiple Items to Cart and their Count', () => {
    cartP.getInventoryBtn()
    .each(($el, index) =>{
        if(index<3){
            cy.wrap($el).click();
        }
    })
     inventoryP.cartBadge().should('have.text','3');
});

it('Verify Removing Multiple Items from Cart and their Count', () => {
    cartP.getInventoryBtn().each(($el, index) =>{
        if(index<3){
            cy.wrap($el).click();
        }
    }) 
        inventoryP.cartBadge().should('have.text','3');
        cartP.getInventoryBtn()
        .each(($el, index) =>{
            if(index<3){
                cy.wrap($el).click();
            }
        })  

        inventoryP.cartBadge().should('not.exist');
});

/// Cart value should be 0 of empty after logout and login again
// but it found 1 item in the cart. So test is failing.
it('Verify Cart Page after Logout and Login again', () => {
    inventoryP.getFirstItemBtn().click();
    inventoryP.cartLink().click();
    cy.url().should('include','cart.html');
    loginP.logout();
    loginP.SouceLogin('standard_user','secret_sauce');
    inventoryP.cartLink().click();
    cy.get('.cart_item').should('have.length',1);   

});

    

});
