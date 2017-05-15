const assert = require('assert');
const moment = require('moment');

describe('Searching with found results', () => {
    before(() => {
        browser
            .url('/')
            .setValue('input[name="query"]', 'Umbrella')
            .click('button[class="btn btn-default"]');
    });

    it('shoud', () => {
        let rows = browser.elements('.row a[class="btn btn-primary"]');
        assert.equal(2, rows.value.length);
    });

    it('should find 2 products', () => {
        let rows = browser.elements('.row a[class="btn btn-primary"]');
        assert.equal(2, rows.value.length);
    });

    it('should have right bread crumbs', () => {
        let crumbs = browser.getText('ol li');
        assert.equal(crumbs[0], 'Home');
        assert.equal(crumbs[1], 'Search');
        assert.equal(crumbs[2], '"Umbrella"');
    });
});

describe('Bread crumbs', () => {
   it('should show right bread crumbs', () => {
       browser
           .url('/')
           .click('a[href="/?category=Kitchen"]')
           .click('a[href="/item/2"');

       let crumbs = browser.getText('ol li');
       assert.equal(crumbs[0], 'Home');
       assert.equal(crumbs[1], 'Kitchen');
       assert.equal(crumbs[2], 'Coffee Mug');
   });
});

describe('Review datetime', () => {
    const expectedReview = 'Hello, World!';
    const expectedName = 'Kekes';

    let name;
    let date;
    let review;

    before(() => {
        browser
            .url('/item/15')
            .setValue('textarea[name="review"]', expectedReview)
            .setValue('input[id="name"]', expectedName)
            .click(`input[value="5"]`)
            .click('form:nth-child(2) button[type="submit"]');

        let reviews = browser.getText('div[class="row"]>div>div>div>div')
            .filter((text) => text !== '');
        let lastReview = reviews[reviews.length - 1];
        name = lastReview.split(' ')[0];
        review = lastReview.split('\n')[1];
        date = lastReview.split('\n')[0].split(' ').slice(1).join(' ');
    });

    it('should have right name', () => {
        assert.equal(expectedName, name);
    });

    it('should have right review', () => {
        assert.equal(expectedReview, review);
    });

    it('should have right datetime format', () => {
        assert(moment(date, 'MMMM Do YYYY, h:m:s a').isValid());
    });
});
