class checkoutPage {

checkOutTitle() {
    return cy.get('.title');
}


checkOutBtn() {
    return cy.getByTest('checkout');
}


}

export default checkoutPage;
