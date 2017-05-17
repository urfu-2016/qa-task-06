const assert = require('assert');
const moment = require ('moment');

describe('Mongomart', () => {

    it('should find 2 product by query "books"', () => {
        const data = browser
			.url('/')
			.addValue('input[name="query"]','books')
			.click('button[type="submit"]')
			.elements('.row img');
			
		assert.equal(data.value.length, 2);
	});
	
	it('should be right navigation', () => {
        browser.url('/item/17');
		
		const topLevel = browser.getText('.breadcrumb li:nth-child(1) a');
		const category = browser.getText('.breadcrumb li:nth-child(2) a');
		const item = browser.getText('.breadcrumb li:nth-child(3)');
		const href = browser.getAttribute('.breadcrumb li:nth-child(2) a', 'href');
		
		assert.equal(topLevel, 'Home');
		assert.equal(category, 'Umbrellas');
		assert.equal(item, 'MongoDB Umbrella (Brown)');
		assert.equal(href, 'http://urfu-2016-testing.herokuapp.com/?category=Umbrellas');
	});

	
	it('should be right date format', () => {
        browser.url('/item/17');
		
		const actualDate = browser.getText('.media-heading small')[2];

		assert(moment(actualDate, 'MMMM Do YYYY, h:m:s a', true).isValid());	
			
	});

});