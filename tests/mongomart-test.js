const assert = require("assert");
const moment = require("moment");

describe("Mongomart", () => {
    describe('Product search', () => {
        before(() => {
            browser
                .url('/');
        });

        it('should show 0 product for ""', () => {
            browser
                .setValue("input[name='query']", "")
                .click('button[type="submit"]');
            assert.equal(browser.getText('i'), '0 Products');

        });
    });

    describe('Comments', () => {

        it('should have right datetime format', () => {
            browser
                .url('/item/12')
                .click(`input[value="5"]`)
                .click('form:nth-child(2) button[type="submit"]');
            let allComments = browser.getText('div.col-lg-12>div');
            const date = browser.getText('.media-heading small')[allComments.length - 1];

            assert(moment(date, 'MMMM Do YYYY, h:m:s a').isValid());
        });
    });

    describe('Bread crumbs', () => {

        it('should show right bread crumbs for "Leaf Sticker"', () => {
            browser
                .url('/')
                .click('a[href="/?category=Stickers"]')
                .click('a[href="/item/12"');

            let crumbs = browser.getText('ol li');
            assert.equal(crumbs[0], 'Home');
            assert.equal(crumbs[1], 'Stickers');
            assert.equal(crumbs[2], 'Leaf Sticker');
        });
    });
});