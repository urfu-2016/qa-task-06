const assert = require('assert');
const moment = require('moment');

describe('Mongomart', () => {
    describe('Show one product `stress ball` by search', () => {
        before(() => {
            browser
                .url('http://urfu-2016-testing.herokuapp.com/')
                .setValue('input[name="query"]', 'stress ball')
                .click('button[type="submit"]');
        });

        it('should show one product with name `stress ball`', () => {
            const element = browser.elements('div.row img.img-responsive');
            const productsAmount = browser.getText('div.container div.row div.col-md-12 div i');
            const productName = browser.getText('div.container div.row div.col-md-12 div.row div.col-md-5 h3 a');

            assert.equal(element.value.length, 1);
            assert.equal(productsAmount, '1 Products');
            assert.equal(productName, 'Stress Ball');
        });

        it('should breadcrumbs equals `Home/Search/"stress ball"`', () => {
            const firstCrumb = browser.getText('.breadcrumb li:nth-child(1) a');
            const secondCrumb = browser.getText('.breadcrumb li:nth-child(2)');
            const lastCrumb = browser.getText('.breadcrumb li.active');

            assert.equal(firstCrumb, 'Home');
            assert.equal(secondCrumb, 'Search');
            assert.equal(lastCrumb, '"stress ball"');
        });

        it('should description of product contain `stress ball`', () => {
            const productDescription = browser.getText('div.container div.row div.col-md-12 div.row div.col-md-5 p');
            
            assert.notEqual(productDescription.match(/stress ball/), -1)
        });
    });

    describe('Show breadcrumbs `Home/Books/MongoDB The Definitive Guide`', () => {
        before(() => {
            browser
                .url('http://urfu-2016-testing.herokuapp.com/?category=Books')
                .click('div.container div:nth-child(2) div.col-md-10 div:nth-child(1) div.col-md-5 a');
        });

        it('should show page with product `MongoDB The Definitive Guide`', () => {
            const productName = browser.getText('div.container div.row div.row div.col-lg-12 h1.page-header');

            assert.notEqual(productName.match(/MongoDB The Definitive Guide/), -1);
        });

        it('should breadcrumbs equals `Home/Books/MongoDB The Definitive Guide`', () => {
            const firstCrumb = browser.getText('.breadcrumb li:nth-child(1) a');
            const secondCrumb = browser.getText('.breadcrumb li:nth-child(2)');
            const lastCrumb = browser.getText('.breadcrumb li.active');

            assert.equal(firstCrumb, 'Home');
            assert.equal(secondCrumb, 'Books');
            assert.equal(lastCrumb, 'MongoDB The Definitive Guide');
        });
    });

    describe('Show correct date/time format of review on product page', () => {
        let submitReviewDate;
        before(() => {
            browser
                .url('http://urfu-2016-testing.herokuapp.com/item/11')
                .setValue('textarea[name="review"]', 'ReviewText')
                .setValue('input[name="name"]', 'ReviewName')
                .click('div.well form button[type="submit"]');
            submitReviewDate = new Date();
        });

        it('should review date be equals `submitReviewDate`', () => {
            const dates = browser.elements('div > div > h4 > small');
            let reviewDate = dates.value[dates.value.length - 1].getText();
            reviewDate = moment.utc(reviewDate, 'MMMM Do YYYY, h:m:s a');
            reviewDate = new Date(reviewDate.toString());

            assert.ok(submitReviewDate.getTime() - reviewDate.getTime() <= 60 * 1000);
        });

        it('should review date have correct date format', () => {
            const dates = browser.elements('div > div > h4 > small');
            const reviewDate = dates.value[dates.value.length - 1].getText();

            assert(moment(reviewDate, 'MMMM Do YYYY, h:m:s a').isValid());
        });

        it('should product page contain review', () => {
            let names = browser.getText('.row > .row > div > div > div > h4');
            names = names[names.length - 1].split(' ');
            const reviewName = names.slice(0, names.length - 5).join(' ');
            const comments = browser.getText('.row > .row > div > div > div');
            const reviewText = comments[comments.length - 1].split('\n')[1];
            
            assert.equal(reviewName, 'ReviewName');
            assert.equal(reviewText, 'ReviewText');
        });
    });
});