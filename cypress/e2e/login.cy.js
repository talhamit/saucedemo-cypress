import loginPage from "../pages/loginPage";
import inventory from "../pages/inventory";
import user from "../fixtures/user.json";


const loginP = new loginPage();
const inventoryP = new inventory();

describe('Login Test Suite', () =>{


beforeEach(() => {
    //cy.visit('/');
    loginP.SouceLogin('standard_user','secret_sauce');
});

it('Login With Valid Credentials', () => {

    cy.url().should('include','inventory.html');
    inventoryP.getPageTitle().should('have.text','Products');    
})


/*--------Session Not Working as Expected Vs simple login function working fine.-------
    Alway fail the test After sesiion retrieve
     app does not allow to visit inventory.html or product page.
     So i use hack --- { failOnStatusCode: false });--"this code bypass the error"
    After that working fine---- but its not a solution----  Its look like a bug in app */



/* it.only('Login With Valid Credentials', () => {

  
        //cy.loginSession();
        loginP.visit();
        loginP.login(user.validUser.username,user.validUser.password);
        cy.url().should('include','inventory.html');
        inventoryP.getPageTitle().should('have.text','Products');    
})

it('Login With Valid Credentials', () => {
    cy.loginSession();   
    cy.visit('/');       
    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.url().should('include','inventory.html');
    inventoryP.getPageTitle().should('have.text','Products');   
})*/
})


describe('Invalid LOGIN Tests', () =>{

        beforeEach(() => {  
            loginP.visit();
        })
    it('Should not allow invalid user to login', () =>{
   
    
    loginP.SouceLogin(user.lockedUser.username,user.lockedUser.password);
    loginP.errorMessage().should('have.text','Epic sadface: Sorry, this user has been locked out.');
    })

    it('Should not allow login with invalid password', () =>{
   
       
        loginP.SouceLogin(user.validUser.username,'wrong_password');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');
        })
    
    it('Should not allow login with blank username', () =>{
   
       
        loginP.SouceLogin('',user.validUser.password);
        loginP.errorMessage().should('have.text','Epic sadface: Username is required');
        })
    
    it('Should not allow login with blank password', () =>{

        loginP.SouceLogin(user.validUser.username,'');
        loginP.errorMessage().should('have.text','Epic sadface: Password is required');
        })
    it('Should not allow login with blank username and password', () =>{

        loginP.SouceLogin('','');
        loginP.errorMessage().should('have.text','Epic sadface: Username is required');
        })

    it('Should not allow login with special characters', () =>{

        loginP.SouceLogin('!@#$%','^&*()');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');
        })

    it('Should not allow login with SQL Injection', () =>{

        loginP.visit();
        loginP.SouceLogin('\' OR \'1\'=\'1','\' OR \'1\'=\'1');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');
        })  
    
    it('Should not allow login with very long strings', () =>{

        const longString = 'a'.repeat(1000);    
        loginP.SouceLogin(longString,longString);
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');
        })

    it('Should not allow login with whitespace only', () =>{

        loginP.SouceLogin('     ','     ');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');
        })
    
    it('Should not allow login with case sensitive username', () =>{

        loginP.SouceLogin('STANDARD_USER','secret_sauce');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })
    
    it('Should not allow login with case sensitive password', () =>{

        loginP.SouceLogin('standard_user','SECRET_SAUCE');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })
    
    it('Should not allow login with leading/trailing spaces', () =>{

        loginP.SouceLogin(' standard_user ',' secret_sauce ');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })
    
    it('Should not allow login with HTML/JS code', () =>{

        loginP.SouceLogin('<script>alert(1)</script>','<b>bold</b>');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })
    
    it('Should not allow login with Unicode characters', () =>{

        loginP.SouceLogin('用户','密码');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })
    
    it('Should not allow login with emojis', () =>{

        loginP.SouceLogin('😀😃😄','😁😆😅');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })

    it('Should not allow login with SQL keywords', () =>{

        loginP.SouceLogin('SELECT * FROM users','DROP TABLE users');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })
    
    it('Should not allow login with script tags', () =>{

        loginP.SouceLogin('<script>maliciousCode()</script>','<img src=x onerror=alert(1)>');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })

    it('Should not allow login with SQL comments', () =>{

        loginP.SouceLogin('standard_user--','secret_sauce--');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })
    
    it('Should not allow login with mixed valid/invalid credentials', () =>{

        loginP.SouceLogin('standard_user','wrong_password');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })
    
    it('Should not allow login with empty strings', () =>{

        loginP.SouceLogin(String.fromCharCode(0),String.fromCharCode(0));
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');
        })

    it.skip('Should not allow login with very long username and short password', () =>{

        const longUsername = 'a'.   repeat(1000);    
        loginP.SouceLogin(longUsername,'short');
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })

    it.skip('Should not allow login with short username and very long password', () =>{

        const longPassword = 'b'.repeat(1000);    
        loginP.SouceLogin('short',longPassword);
        loginP.errorMessage().should('have.text','Epic sadface: Username and password do not match any user in this service');    
        })



})


