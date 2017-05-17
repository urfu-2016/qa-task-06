const assert = require('assert');
var randomstring = require("randomstring");
const TEST_LOCATION = 'http://urfu-2016-testing.herokuapp.com';

describe('Mongomart search', () => {
    it('should return 2 items on search query "gray"', () => {
        const searchResults = [
            'Gray Hooded Sweatshirt',
            'MongoDB Umbrella (Gray)',
        ];
        browser.url(TEST_LOCATION)
            .addValue('input[name="query"]','gray')
            .click('button[type="submit"]');
        assert(browser.getUrl(), `${TEST_LOCATION}/search?query=gray`);
        assert.deepEqual(browser.getText('.col-md-5 > h3'), searchResults);
    });
    it('should return "0 results" on empty query', () => {
        browser.url(TEST_LOCATION)
          .click('button[type="submit"]');
        assert(browser.getUrl(), `${TEST_LOCATION}/search?query=`);
        assert(browser.getText('i'), '0 products');
    });
});

describe('Mongomart add comment', () => {
    it('should return 2 items on search query "gray"', () => {
        const testComment = randomstring.generate();
        const testName = randomstring.generate();
        browser.url(TEST_LOCATION + '/item/13')
          .setValue('textarea', testComment)
          .setValue('#name', testName)
          .click('button[class="btn btn-primary"]');
        const nowPartDate = Date().split(' ').slice(0, 3).join(' ');
        assert(browser.getText('.media-heading small').pop().split(',')[0], nowPartDate)
    });
});

describe('Mongomart bread crumbs', () => {
    it('should return 2 items on search query "gray"', () => {
        const breads = [ 'Home', 'Apparel', 'Gray Hooded Sweatshirt' ];
        browser.url(TEST_LOCATION + '/item/1');
        assert.deepEqual(browser.getText('li'), breads);
    });
});

