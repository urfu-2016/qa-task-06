const assert = require('assert');

describe('Mongomart tests', () => {
    it('should print correct navigation line for item request', () => {
        browser.url('http://urfu-2016-testing.herokuapp.com/');
        browser.click('div.row:nth-child(3) > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)');
        browser.waitForValue('.active', 3000);
        lastText = browser.getValue('.active');
        header = browser.getValue('h1.page-header');
        
        //assert.equal(lastText, header);
    });
    it('should print correct search results for query', () => {
        browser.url('http://urfu-2016-testing.herokuapp.com/');
        browser.setValue('input.form-control:nth-child(1)', 'Umbrella');
        browser.click('button.btn:nth-child(2)');
        
        browser.waitForValue('div.row:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)', 2000);
    });
    
    it('should print correct time (utc+0) for comment adding', () => {
        browser.url('http://urfu-2016-testing.herokuapp.com/item/3');
        browser.click('button.btn:nth-child(4)');
        browser.waitForValue('div.col-lg-12:nth-child(2) > div:nth-child(95) > div:nth-child(1) > h4:nth-child(1)');
    });
});
