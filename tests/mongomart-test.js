const moment = require ('moment');
const assert = require ('assert');


describe('Product search', () => {
    before(() => {
        browser
            .url('http://urfu-2016-testing.herokuapp.com/')
            .setValue("input[name='query']", "Gray")
            .click('button[type="submit"]')
    });

    it('should return the goods found on request `Gray`', () => {
        assert.equal(browser.getText('.breadcrumb li:nth-child(1) a'), 'Home');
        assert.equal(browser.getText('.breadcrumb li:nth-child(2)'), 'Search');
        assert.equal(browser.getText('.active'), '"Gray"');
        assert.equal(browser.getText('i'), '2 Products');
    });
});

describe('Correctness of bread crumbs', () => {
    before(() => {
        browser
            .url('http://urfu-2016-testing.herokuapp.com/')
            .click('a[href="/cart"]')
    })
    it('Check for the display of bread crumbs in the basket', () => {
        assert.equal(browser.getText('.breadcrumb li:nth-child(1) a'), 'Home');
        assert.equal(browser.getText('.active'), 'Cart');
    });

    it('Displaying bread crumbs on the product', () => {
        browser.url('http://urfu-2016-testing.herokuapp.com/item/19');
        assert.equal(browser.getText('.breadcrumb li:nth-child(1) a'), 'Home');
        assert.equal(browser.getText('.breadcrumb li:nth-child(2) a'), 'Books');
        assert.equal(browser.getText('.active'), 'MongoDB University Book');
    });

    it('Display of biscuits on the main page', () => {
         browser.url('http://urfu-2016-testing.herokuapp.com/')
        assert.equal(browser.getText('.breadcrumb li:nth-child(1) a'), 'Home');
        assert.equal(browser.getText('.active')[0], 'All');
    });
});

describe('Displaying the date and time in the recall', () => {
    before(() => {
        browser
            .url('http://urfu-2016-testing.herokuapp.com/item/21')
            .addValue('textarea[name="review"]', "Good")
            .addValue('input[name="name"]', "Test")
            .click('div.well>form>button');
    });
    var currentDate = new Date().getTime();

    it('should return the time in the correct format old comment', () => {
        const date = browser.getText('.media-heading small')[0];

        assert(moment(date, 'MMMM Do YYYY, h:m:s a').isValid());
    });

    it('should return the time in the correct format new comment', () => {
        const allcomments = browser.getText('.col-lg-12')[2].split('\n')
        const date = allcomments[allcomments.length-2];
        reviewDate = moment.utc(date.substring(4), 'MMMM Do YYYY, h:m:s a');
        reviewDate = new Date(reviewDate.toString()).getTime() ;

        assert.ok(currentDate - reviewDate <= 60 * 1000);
        assert.equal(allcomments[allcomments.length-1], 'Good');
        assert.equal(allcomments[allcomments.length-2].substring(0,4), 'Test');
    });
});