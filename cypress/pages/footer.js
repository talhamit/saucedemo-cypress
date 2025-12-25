class footerNav {
    footerContainer() {
        return cy.get('footer.footer');
    }   
    twitterLink() {
        return cy.get('a[href="https://twitter.com/saucelabs"]');
    }   
    facebookLink() {
        return cy.get('a[href="https://www.facebook.com/saucelabs"]');
    }
    linkedinLink() {
        return cy.get('a[href="https://www.linkedin.com/company/sauce-labs/"]');
    }

    footerText(){
        return cy.get('footer.footer .footer_copy');
    }
}

export default footerNav;
