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

    it('should show right amount of found products', () => {
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

describe('Correct bread crumbs', () => {

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
});
