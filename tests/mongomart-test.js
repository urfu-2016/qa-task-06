const chai = require('chai');
const moment = require('moment')
describe('Mongo market tests', () => {
    it('поиск продукта по совпадению', () => {
        browser
            .url('')
            .click('input[placeholder="Search"]')
            .keys('usb')
            .click('button[type="submit"]')
        chai.assert.equal('USB Stick (Green),USB Stick (Leaf),USB Stick',browser.getText('div.col-md-5 > h3'));
    });
    it('Хлебные крошки', () => {
        browser
            .url('')
            .click('*=Swag')
        chai.assert.equal(browser.getText('.breadcrumb > li'),'Home,Swag')
    });
    it('Проверка даты комментария', () => {
        var today = moment();
        browser
            .url('/item/22')
            .click('div.well textarea')
            .keys('test')
            .click('div.well button[type="submit"]')
        var myCommet =  browser.getText('div.col-lg-12>div')[browser.getText('div.col-lg-12>div').length - 1];
        var date = moment.utc(myCommet.split('\n')[0], 'MMMM Do YYYY, h:mm:ss a');
        chai.assert.ok(today.diff(date, 'seconds') < 5);
    });
});
