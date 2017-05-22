const chai = require('chai');
const moment = require('moment');

describe('Mongomart', () =>
{
    it('Should show 2 product for "Pen" in product name.', () =>
    {
        browser
            .url('/')
            .setValue('input[placeholder="Search"]', 'Pen')
            .click('button[type="submit"]');

        chai.expect(browser.getUrl()).to.contain('/search?query=Pen');
        let goods = browser.elements('.row h4');
        chai.expect(goods.value.length).to.equal(2);
        let productNames = browser.getText('div.col-md-5 > h3');
        productNames.forEach(function (product)
        {
            chai.expect(product).to.contain('Pen');
        })
    });

    it('Should show 3 product for "space" in product description.', () =>
    {
        browser
            .url('/')
            .setValue('input[placeholder="Search"]', 'space')
            .click('button[type="submit"]');

        chai.expect(browser.getUrl()).to.contain('/search?query=space');
        let goods = browser.elements('.row h4');
        chai.expect(goods.value.length).to.equal(3);
        let productTexts = browser.getText('div.col-md-5 > h4');
        productTexts.forEach(function (product)
        {
            chai.expect(product).to.contain('space');
        })
    });

    it('Should show 5 product for "soft" in product text.', () =>
    {
        browser
            .url('/')
            .setValue('input[placeholder="Search"]', 'soft')
            .click('button[type="submit"]');

        chai.expect(browser.getUrl()).to.contain('/search?query=soft');
        let goods = browser.elements('.row h4');
        chai.expect(goods.value.length).to.equal(5);
        let productTexts = browser.getText('div.col-md-5 > p');
        productTexts.forEach(function (product)
        {
            chai.expect(product).to.contain('soft');
        })
    });

    it('Should be Home/Stickers/Leaf Sticker for http://urfu-2016-testing.herokuapp.com/item/12.', () =>
    {
        browser
            .url('/item/12/');

        let breadcrumbs = browser.getText('.breadcrumb > li');
        chai.expect(breadcrumbs).to.be.deep.equal(['Home', 'Stickers', 'Leaf Sticker']);
    });

    it('Should be Home/Cart for http://urfu-2016-testing.herokuapp.com/user/5922b15aff12861200c61d5c/cart.', () =>
    {
        browser
            .url('/user/5922b15aff12861200c61d5c/cart/');

        let breadcrumbs = browser.getText('.breadcrumb > li');
        chai.expect(breadcrumbs).to.be.deep.equal(['Home', 'Cart']);
    });

    it('Should be Home/Electronics for http://urfu-2016-testing.herokuapp.com/?category=Electronics', () =>
    {
        browser
            .url('/?category=Electronics/');

        let breadcrumbs = browser.getText('.breadcrumb > li');
        chai.expect(breadcrumbs).to.be.deep.equal(['Home', 'Electronics/']);
    });

    it('Should be Home/All for http://urfu-2016-testing.herokuapp.com/', () =>
    {
        browser
            .url('/');

        let breadcrumbs = browser.getText('.breadcrumb > li');
        chai.expect(breadcrumbs).to.be.deep.equal(['Home', 'All']);
    });

    it('Should show correct comment.', () =>
    {
        let currentDate = moment();
        browser
            .url('/item/12/')
            .setValue('input[id="name"]', 'TestName')
            .setValue('textarea[name="review"]', 'TestText')
            .click('div.well button[type="submit"]');

        let allComments = browser
            .getText('div[class="row"]>div>div>div>div')
            .filter((text) => text !== '');
        let myComment = allComments[allComments.length - 1];

        let commentDate = myComment.split('\n')[0].split(' ').slice(1).join(' ');
        commentDate = moment.utc(commentDate, 'MMMM Do YYYY, h:mm:ss a');
        let difference = currentDate.diff(commentDate);
        chai.expect(difference).to.be.below(600*1000);

        let commentName = myComment.split(' ')[0];
        chai.expect(commentName).to.be.equal('TestName');

        let commentText = myComment.split('\n')[1];
        chai.expect(commentText).to.be.equal('TestText');
    });
});
