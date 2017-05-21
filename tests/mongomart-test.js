const expect = require('chai').expect;
const moment = require('moment');

describe('Mongomart', () => {
    let selectors = {
        firstCrumb: '.breadcrumb li:nth-child(1) a',
        secondCrumb: '.breadcrumb li:nth-child(2)',
        lastCrumb: '.breadcrumb li.active',
        date: '.media-heading small'
    };

    describe('Show one product `stress ball` by search', () => {
        before(() => {
            browser
                .url('/')
                .setValue('input[name="query"]', 'stress ball')
                .click('button[type="submit"]');
        });

        it('should be one product', () => {
            const productsAmount = browser.getText('div.container div.row div.col-md-12 div i');

            expect(productsAmount).to.be.equal('1 Products');
        });

        it('should show one product on the page', () => {
            const element = browser.elements('div.row img.img-responsive');

            expect(element.value).to.have.lengthOf(1);
        });

        it('should name or description of product contain `stress ball` (ignore case)', () => {
            const productDescription = browser.getText('div.container div.row div.col-md-12 div.row div.col-md-5 p');
            const productName = browser.getText('div.container div.row div.col-md-12 div.row div.col-md-5 h3 a');
            const matches = [
                productDescription.match(/stress ball/i),
                productName.match(/stress ball/i)
            ].filter(item => {
                return item !== -1;
            })

            expect(matches).to.have.length.above(0);
        });
    });

    describe('Breadcrumbs tests', () => {
        const getHref = selector => {
            return browser.elements(selector).value[0].getAttribute('href');
        }

        before(() => {
            browser.url('/')
        });

        it('should breadcrumbs equals `Home/Cart`', () => {
            browser.url('/cart');
            const homeHref = getHref(selectors.firstCrumb);

            expect(homeHref).to.be.equal(browser.options.baseUrl);
            expect(browser.getText(selectors.firstCrumb)).to.be.equal('Home');
            expect(browser.getText(selectors.lastCrumb)).to.be.equal('Cart');
        });

        it('should breadcrumbs equals `Home/All`', () => {
            browser.url('/');
            const homeHref = getHref(selectors.firstCrumb);

            expect(homeHref).to.be.equal(browser.options.baseUrl);
            expect(browser.getText(selectors.firstCrumb)).to.be.equal('Home');
            expect(browser.getText(selectors.lastCrumb)).to.be.equal('All');
        });

        it('should breadcrumbs equals `Home/Books/MongoDB The Definitive Guide`', () => {
            browser.url('/item/11');
            const homeHref = getHref(selectors.firstCrumb);
            const booksHref = getHref(`${selectors.secondCrumb} a`);

            expect(homeHref).to.be.equal(browser.options.baseUrl);
            expect(booksHref).to.be.equal(`${browser.options.baseUrl}?category=Books`);
            expect(browser.getText(selectors.firstCrumb)).to.be.equal('Home');
            expect(browser.getText(selectors.secondCrumb)).to.be.equal('Books');
            expect(browser.getText(selectors.lastCrumb)).to.be.equal('MongoDB The Definitive Guide');
        });

        it('should breadcrumbs equals `Home/Search/"stress ball"`', () => {
            browser
                .url('/')
                .setValue('input[name="query"]', 'stress ball')
                .click('button[type="submit"]');
            const homeHref = getHref(selectors.firstCrumb);

            expect(homeHref).to.be.equal(browser.options.baseUrl);
            expect(browser.getText(selectors.firstCrumb)).to.be.equal('Home');
            expect(browser.getText(selectors.secondCrumb)).to.be.equal('Search');
            expect(browser.getText(selectors.lastCrumb)).to.be.equal('"stress ball"');
        });
    });

    describe('Show correct date/time format of review on product page', () => {
        let submitReviewDate;

        before(() => {
            browser
                .url('/item/11')
                .setValue('textarea[name="review"]', 'ReviewText')
                .setValue('input[name="name"]', 'ReviewName')
                .click('div.well form button[type="submit"]');
            submitReviewDate = new Date();
        });

        it('should review date have correct date format', () => {
            const dates = browser.elements(selectors.date);
            const reviewDate = dates.value[dates.value.length - 1].getText();

            expect(moment(reviewDate, 'MMMM Do YYYY, h:m:s a').isValid()).to.be.true;
        });

        it('should review date be equals `submitReviewDate`', () => {
            const dates = browser.elements(selectors.date);
            let reviewDate = dates.value[dates.value.length - 1].getText();
            reviewDate = moment.utc(reviewDate, 'MMMM Do YYYY, h:m:s a');
            reviewDate = new Date(reviewDate.toString());

            expect(submitReviewDate.getTime() - reviewDate.getTime() <= 60 * 1000).to.be.true;
        });
    });
});