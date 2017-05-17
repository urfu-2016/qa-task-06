const assert = require('assert');

const URL = 'http://urfu-2016-testing.herokuapp.com/';



describe('Search of products with not an empty result', () => {



    before(() => {

        browser

            .url(URL)

            .setValue('input[name="query"]', 'gray')

            .click('button[type="submit"]');

    });



    it('should show right amount of found products', () => {

        var productAmount = browser.getText('i');

        assert.equal(productAmount, '2 Products');

    });
