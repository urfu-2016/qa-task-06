const chai = require('chai');
const moment = require('moment');

describe('Mongomart', () =>
{
    it('Should show 2 product for "Pen".', () =>
    {
        browser
            .url('http://urfu-2016-testing.herokuapp.com/')
            .setValue("input[name='query']", "Pen")
            .click('button[type="submit"]');

        chai.expect(browser.getUrl()).to.contain('/search?query=Pen');
        let goods = browser.elements('.row h4');
        chai.expect(goods.value.length).to.equal(2);
    });

    it('Should be Home/Stickers/Leaf Sticker for http://urfu-2016-testing.herokuapp.com/item/12.', () =>
    {
        browser
            .url('http://urfu-2016-testing.herokuapp.com/item/12/');

        let breadcrumbs = browser.getText('.breadcrumb > li');
        chai.expect(breadcrumbs).to.be.deep.equal(['Home', 'Stickers', 'Leaf Sticker']);
    });

    it('Should show correct date for comment.', () =>
    {
        let currentDate = moment();
        browser
            .url('http://urfu-2016-testing.herokuapp.com/item/12/')
            .click('div.well namearea')
            .keys('Test name')
            .click('div.well textarea')
            .keys('Test message')
            .click('div.well button[type="submit"]');

        let allComments = browser.getText('div.col-lg-12>div');
        let myCommet = allComments[allComments.length - 1];
        let name = myCommet.split(' ')[0];
        let commentDateStr = myCommet.split('\n')[0];
        let text = myCommet.split('\n')[1];
        let commentDate = moment.utc(commentDateStr, 'MMMM Do YYYY, h:mm:ss a');

        chai.expect(name).to.be.equal('Test name');
        chai.expect(text).to.be.equal('Test message');
        let difference = currentDate.diff(commentDate);
        chai.expect(difference).to.be.below(60*1000);
    });
});
