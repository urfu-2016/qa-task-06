const moment = require('moment');
const chai = require('chai');
chai.should();

describe('Mongomart', () => {
    it('should update bread crumbs after click on `Books`', () => {
        browser
            .url('')
            .click('*=Books')

        let actualCrumbs = browser.getText('.breadcrumb > li');
        actualCrumbs.should.be.deep.equal(['Home', 'Books']);
    });

    it('should search product by exact match', () => {
        let searchString = 'Coffee Mug';
        browser
            .url('')
            .click('input[placeholder="Search"]')
            .keys(searchString)
            .click('button[type="submit"]')

        browser.getUrl().should.contains('/search?query=Coffee+Mug')
        let products = browser.getText('div.col-md-5 > h3');
        products.should.contains(searchString);
    });

    it('should show correct comment date', () => {
        var currentDate = moment();
        browser
            .url('/item/11')
            .click('div.well textarea')
            .keys('abdacodabdra')
            .click('div.well button[type="submit"]')

        let comments = browser.getText('div.col-lg-12>div')
        let myCommet = comments[comments.length - 1];
        let commentDateStr = myCommet.split('\n')[0];
        let commentDate = moment.utc(commentDateStr, 'MMMM Do YYYY, h:mm:ss a');

        let difference = Math.abs(commentDate.diff(currentDate));
        difference.should.be.lessThan(5*60*1000)
    });
});
