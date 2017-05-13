const assert = require('assert');
const moment = require ('moment');

describe('Mongomart', () => {
    it('should find one product by query "cup"', () => {
        const data = browser
			.url('/')
			.addValue('input[name="query"]','cup')
			.click('button[type="submit"]')
			.elements('.row img');
			
		assert.equal(data.value.length, 1);
	});
	it('should be right navigation', () => {
        browser.url('/item/11');
		
		const actualTopLevel = browser.getText('.breadcrumb li:nth-child(1) a');
		const actualCategory = browser.getText('.breadcrumb li:nth-child(2) a');
		const actualItem = browser.getText('.breadcrumb li:nth-child(3)');
		const actualTopLevelHref = browser.getAttribute('.breadcrumb li:nth-child(1) a', 'href');
		const actualCategoryHref = browser.getAttribute('.breadcrumb li:nth-child(2) a', 'href');
		
		assert.equal(actualTopLevel, 'Home');
		assert.equal(actualCategory, 'Books');
		assert.equal(actualItem, 'MongoDB The Definitive Guide');
		assert.equal(actualTopLevelHref, 'http://urfu-2016-testing.herokuapp.com/');
		assert.equal(actualCategoryHref, 'http://urfu-2016-testing.herokuapp.com/?category=Books');
	});
	it('should be same category when click on category link in navigation', () => {
        browser.url('/item/11');
		
		const expectedCategory = browser.getText('.breadcrumb li:nth-child(2) a');
		
		browser.click('.breadcrumb li:nth-child(2) a');
		
		const actualCategory = browser.getText('.breadcrumb li:nth-child(2)');
					
		assert.equal(actualCategory, expectedCategory);
	});
	it('should be right date format', () => {
        browser.url('/item/11');
		
		const actualDate = browser.getText('.media-heading small')[0];

		assert(moment(actualDate, 'MMMM Do YYYY, h:m:s a', true).isValid());	
			
	});

});
