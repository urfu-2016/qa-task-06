const assert = require('assert');
const url = "http://urfu-2016-testing.herokuapp.com/";

describe('Mongomart\'s search and crumbs', () => {
    it('should show 3 products for searching "green"', () => {
        browser.url(url)
            .setValue("input[name=query]", "green")
            .click(".btn-default");
        var products = browser.elements(".btn-primary");

        assert.equal(products.value.length, 3);
    });

    it('should show "Home/Search/\"green\"" crumbs', () => {
        browser.url(url)
            .setValue("input[name=query]", "green")
            .click(".btn-default");

        var crumbs = browser.getText(".breadcrumb li");

        assert.equal(crumbs.length, 3);
        assert.equal(crumbs[0], 'Home');
        assert.equal(crumbs[1], 'Search');
        assert.equal(crumbs[2], '"green"')
    });


});

describe('Comments check', () => {
    var review = "it is a review";
    var name = "it is a name";

    var lastReview = ""
    var lastName = ""

    before(() => {
        browser.timeouts
        browser.url(url + 'item/17')
            .setValue("textarea[name=review]", review)
            .setValue("#name", name)
            .click(".well button");

        var lastNames = browser.getText('.row > .row > div > div > div > h4');
        lastNames = lastNames[lastNames.length - 1].split(' ')
        lastName = lastNames.slice(0, lastNames.length - 5).join(' ');
        var comments = browser.getText('.row > .row > div > div > div');

        lastReview = comments[comments.length - 1].split('\n')[1];
    });

    it('should post comment with entered review', () => {
        assert.equal(lastReview, review);
    });

    it('should post comment with entered name', () => {
        assert.equal(lastName, name);
    });
})