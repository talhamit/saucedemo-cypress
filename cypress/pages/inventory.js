class inventory {

    getPageTitle(){
       return cy.get('[data-test="title"]');
    }


    getItemNames(){
        return cy.getByTest('inventory-item-name');
    }

    getFirstItemBtn(){
        return cy.getByTest('inventory-item-name')
            .first().parents('.inventory_item')
            .find('.btn_inventory')
    }

    cartLink(){
        return cy.get('.shopping_cart_link');
    }

    cartBadge(){
        return cy.get('.shopping_cart_badge');
    }

    

}

export default inventory;