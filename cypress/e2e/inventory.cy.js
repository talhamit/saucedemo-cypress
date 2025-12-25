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

        inventoryP.getItemNames().first().should('have.text','Sauce Labs Backpack');

    });

    it('Verify Last Item Name on Inventory Page', () => {

        inventoryP.getItemNames().last().should('have.text','Test.allTheThings() T-Shirt (Red)'); 

    });

    it('Verify Inventory Items have Add to Cart Button', () => {

        cy.getByTest('inventory-item').each(($el) =>{
            cy.wrap($el).find('button.btn_inventory').should('have.text','Add to cart'); 
        })
    });

    it('Verify Inventory Items have Price', () => {

        cy.getByTest('inventory-item').each(($el) =>{
            cy.wrap($el).find('div.inventory_item_price').should('exist'); 
        })  
    });

    it('Verify Inventory Items have Image', () => {

        cy.getByTest('inventory-item').each(($el) =>{
            cy.wrap($el).find('img.inventory_item_img').should('exist'); 
        })  
    });

    it('Verify Inventory Items have Description', () => {

        cy.getByTest('inventory-item').each(($el) =>{
            cy.wrap($el).find('div.inventory_item_desc').should('exist'); 
        })
    });

    it('Verify Inventory Items have Remove Button after Adding to Cart', () => {

        inventoryP.getFirstItemBtn().click();
        inventoryP.getFirstItemBtn().should('have.text','Remove'); 
    });

    


    it('Add First Item to Cart', () => {

        inventoryP.getFirstItemBtn().click();
        cy.get('.shopping_cart_badge').should('have.text','1'); 
    });

    it('Add All Items to Cart', () => {

        cy.get('button.btn_inventory').each(($el) => {
        cy.wrap($el).click();
        } );
        cy.get('.shopping_cart_badge').should('have.text','6');
    });

    it('Remove First Item from Cart', () => {

        inventoryP.getFirstItemBtn().click();
        cy.get('.shopping_cart_badge').should('have.text','1'); 
        inventoryP.getFirstItemBtn().click();
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

    it('Navigate to Cart Page', () => {

        inventoryP.getFirstItemBtn().click();
        inventoryP.cartLink().click();
        cy.url().should('include','cart.html');
        inventoryP.cartBadge().should('have.text','1');

    });

    it('Verify Sorting Items by Name A to Z', () => {

        cy.getByTest('product-sort-container').select('Name (A to Z)');
        inventoryP.getItemNames().first().should('have.text','Sauce Labs Backpack');
        inventoryP.getItemNames().last().should('have.text','Test.allTheThings() T-Shirt (Red)');
    });

    it('Verify Sorting Items by Name Z to A', () => {   
        cy.getByTest('product-sort-container').select('Name (Z to A)');
        inventoryP.getItemNames().first().should('have.text','Test.allTheThings() T-Shirt (Red)');
        inventoryP.getItemNames().last().should('have.text','Sauce Labs Backpack');
    });

    it('Verify Sorting Items by Price Low to High', () => {   
        cy.getByTest('product-sort-container').select('Price (low to high)');
        cy.getByTest('inventory-item-price').first().should('have.text','$7.99');
        cy.getByTest('inventory-item-price').last().should('have.text','$49.99');
    });

    it('Verify Sorting Items by Price High to Low', () => {
        cy.getByTest('product-sort-container').select('Price (high to low)');
        cy.getByTest('inventory-item-price').first().should('have.text','$49.99');
        cy.getByTest('inventory-item-price').last().should('have.text','$7.99');    
    });

   
    it('Verify click on a product name navigates to the product detail page', () => {

        inventoryP.getFirstItemName().invoke('text').then((name) => {
           // cy.log(name);
            
            inventoryP.getFirstItemName().click();
                    cy.url().should('include','inventory-item.html?id=');
                   cy.getByTest('inventory-item-name').should('have.text', name.trim());

        })

        
    });

        /* Then Uses*/
    /*Comparison inventory product name and description to detail page name and description*/
    it.skip('Verify click on a product name navigate to the product detail page and back to inventory page', () => {
        inventoryP.getFirstItemName().invoke('text').then((name) =>{

            cy.getByTest('inventory-item-desc').first().invoke('text').then((itemDesc) => {

            inventoryP.getFirstItemName().click();

            cy.url().should('include','inventory-item.html?id=');
            
            cy.getByTest('inventory-item-name').should('have.text', name.trim());

            cy.getByTest('inventory-item-desc').should('have.text', itemDesc.trim());
            
            cy.go('back');

        
            })
    })
})

            // alias .as uses
     it.only('Verify click on a product name navigate to the product detail page and back to inventory page', () => {
        inventoryP.getFirstItemName().invoke('text').as('firstItemName');

            cy.getByTest('inventory-item-desc').first().invoke('text').as('firstItemDesc');

            inventoryP.getFirstItemName().click();

            cy.url().should('include','inventory-item.html?id=');

            cy.get('@firstItemName').then((name) => {
                cy.getByTest('inventory-item-name').should('have.text', name.trim());
            });

            cy.get('@firstItemDesc').then((itemDesc) => {          
            cy.getByTest('inventory-item-desc').should('have.text', itemDesc.trim());
            });

            /*
            this .go function to go back to previous page of browser history
             this function use 
              going back ('back') or (-1)
                going forward ('forward') or (1)
            */
            cy.go('back');

        
            
    })
})



