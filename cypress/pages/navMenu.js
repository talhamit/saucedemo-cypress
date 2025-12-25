class navMenu {
 
    menuButton(){
        return cy.get('button#react-burger-menu-btn');
    }   

    menuContainer(){
        return cy.get('div.bm-menu-wrap');
    }

    
    
    logoutLink(){
        return cy.get('#logout_sidebar_link');
    }   

    getAllItemsLink(){
        return cy.get('a#inventory_sidebar_link');
    }   
    aboutLink(){
        return cy.get('#about_sidebar_link');
    }   
    resetAppStateLink(){
        return cy.get('#reset_sidebar_link');
    }
    closeMenuButton(){
        return cy.get('#react-burger-cross-btn');
    }   
}
 
 export default navMenu;
