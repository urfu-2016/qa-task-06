const assert = require('assert');
const moment = require ('moment');

describe('Mongomart', () => {
    it('should search usb stick', () => {
        browser.url('http://urfu-2016-testing.herokuapp.com/');

        var productsAssert = ['USB Stick (Green)', 'USB Stick (Leaf)', 
        'MongoDB Umbrella (Brown)', 'MongoDB Umbrella (Gray)', 'USB Stick']

        browser.setValue('input[name="query"]', 'usb stick');
        browser.click('button[class="btn btn-default"]');

        var countStr = browser.getText('div[style="text-align:center;"]');
        var count = parseInt(countStr.split(' ')[0]);

        assert.equal(count, 5)

        var goods = browser.elements('div.col-md-12>div[class="row"]');
        for (var i = 0; i < count; i++){
            browser
        }
    });

    
});
