const assert = require('assert');
const moment = require('moment');

describe("Mongomart", () => {

    describe("Search product in uppercase for TUMBLER", () => {

        before(() => {
            browser
                .url("/")
                .setValue("input[name='query']", "TUMBLER")
                .click("button.btn-default");
        });

        it("should show one product", () => {
            const foundElements = browser.elements("div.row>div.col-md-7>a>img");
            assert.equal(foundElements.value.length, 1);

            const actualNProducts = browser.getText("body>div:nth-child(2)>div:nth-child(2)>div>div:nth-child(4)>i");
            assert.equal(actualNProducts, "1 Products");
        });

        it("should product's description contain TUMBLER (ignore case) ", () => {
            const productDescription = browser.getText("div.col-md-5>p") + browser.getText("div.col-md-5>h3>a");
            assert.notEqual(productDescription.match(/TUMBLER/i), -1);
        });

        it('should breadcrumb equal Home/Search/"TUMBLER"', () => {
            const top = browser.getText("ol.breadcrumb>li:nth-child(1)>a");
            const second = browser.getText("ol.breadcrumb>li:nth-child(2)");
            const last = browser.getText('ol.breadcrumb>li.active');

            assert.equal(top, "Home");
            assert.equal(second, "Search");
            assert.equal(last, '"TUMBLER"');
        });
    });


    describe("Go to main page from product page using a breadcrumb", () => {

        before(() => {
            browser
                .url("/item/15")
                .click("ol.breadcrumb>li:nth-child(1)>a");
        });

        it('should open main page', () => {
            assert.equal(browser.getUrl(), "http://urfu-2016-testing.herokuapp.com/");
        });

        it('should breadcrumb equal Home/Search', () => {
            const top = browser.getText("ol.breadcrumb>li:nth-child(1)>a");
            const second = browser.getText("ol.breadcrumb>li:nth-child(2)");

            assert.equal(top, "Home");
            assert.equal(second, "All");
        });
    });

    describe("Correct date view in review form", () => {
        let expectedDate;

        before(() => {
            browser.url("/item/16");
            browser
                .addValue("textarea.form-control", "Test")
                .addValue("input#name", "Test")
                .click("div.well>form>button");

            expectedDate = new Date();
        });

        it('should correct date format', () => {
            const allDate = browser.elements("div>div>h4.media-heading>small");
            const lastIndex = allDate.value.length - 1;

            let date = allDate.value[lastIndex].getText();
            assert(moment(date, 'MMMM Do YYYY, h:m:s a').isValid());
        });

        it('should actual date', () => {
            const allDate = browser.elements("div>div>h4.media-heading>small");
            const lastIndex = allDate.value.length - 1;

            let actualDate = allDate.value[lastIndex].getText();
            actualDate = moment.utc(actualDate, 'MMMM Do YYYY, h:m:s a');
            actualDate = new Date(actualDate.toString());

            assert.equal(actualDate.toDateString(), expectedDate.toDateString());
            assert.equal(actualDate.getUTCHours(), expectedDate.getUTCHours());
            if (!(actualDate.getUTCMinutes() == expectedDate.getUTCMinutes() || actualDate.getUTCMinutes() == expectedDate.getUTCMinutes()+1)) {
                assert.ok(false);
            }
        });
    });
});
