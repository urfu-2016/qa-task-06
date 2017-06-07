const assert = require('assert');

const moment = require('moment');

const URL = 'http://urfu-2016-testing.herokuapp.com/';



describe('Search of products with not an empty result', () => {



    before(() => {

        browser

            .url(URL)

            .setValue('input[name="query"]', 'pen')

            .click('button[type="submit"]');

    });



    it('should show right amount of found products in note', () => {

        var foundProducts = browser.elements('.img-responsive');

        assert.equal(foundProducts.value.length, 2);

    });



    it('should show right amount of product`s cards', () => {

        var productAmount = browser.getText('i');

        assert.equal(productAmount, '2 Products');

    });



    it('should show right bread crumbs', () => {

        var crumbs = browser.getText('.breadcrumb > li');

        assert.equal(crumbs[0], 'Home');

        assert.equal(crumbs[1], 'Search');

        assert.equal(crumbs[2], '"pen"');

    });

});



describe('Showing of bread crumbs', () => {



    it('should show right bread crumbs for main page', () => {

        browser.url(URL);

        var crumbs = browser.getText('.breadcrumb > li');

        assert.equal(crumbs[0], 'Home');

        assert.equal(crumbs[1], 'All');

    });



    it('should show right bread crumbs for chosen category', () => {

        browser.url('http://urfu-2016-testing.herokuapp.com/?category=Electronics');

        var crumbs = browser.getText('.breadcrumb > li');

        assert.equal(crumbs[0], 'Home');

        assert.equal(crumbs[1], 'Electronics');

    });



    it('should show right bread crumbs for chosen product', () => {

        browser.url('http://urfu-2016-testing.herokuapp.com/item/3');

        var crumbs = browser.getText('.breadcrumb > li');

        assert.equal(crumbs[0], 'Home');

        assert.equal(crumbs[1], 'Swag');

        assert.equal(crumbs[2], 'Stress Ball');

    });



    it('should show right bread crumbs for cart', () => {

        browser.url('http://urfu-2016-testing.herokuapp.com/user/5920794946fad512007b8a17/cart');

        var crumbs = browser.getText('.breadcrumb > li');

        assert.equal(crumbs[0], 'Home');

        assert.equal(crumbs[1], 'Cart');

    });

});



describe('Showing of review`s time and date', () => {

    var currentDate;

    var reviewDate;



    before ( () => {

        browser

            .url('http://urfu-2016-testing.herokuapp.com/item/3')

            .click('div.well button[type="submit"]');

        currentDate = new Date().getTime();

        reviewDate = getReviewDate();

    });



    function getReviewDate() {

        var reviews = browser.getText('div.col-lg-12 > div');

        return reviews[reviews.length - 1];

    }



    it('should show date and time in right format', () => {

        assert(moment(reviewDate, 'MMMM Do YYYY, h:m:s a').isValid());

    });





    it('should show right date and time', () => {

        var reviewDateUTC = moment.utc(reviewDate, 'MMMM Do YYYY, h:m:s a');

        reviewDateUTC = new Date(reviewDateUTC.toString()).getTime();

        assert.ok(currentDate - reviewDateUTC <= 60 * 1000);

    });

});
