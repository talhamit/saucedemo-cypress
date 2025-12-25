class cartPage {
    
    getCartPageTitle() {
        return cy.get('.title');
    }


    cartRemoveButton(){
        return cy.get('button.cart_button');
    }

    getInventoryBtn(){
        return cy.get('button.btn_inventory')
    }

}

export default cartPage;