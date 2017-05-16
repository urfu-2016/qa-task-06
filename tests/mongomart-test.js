const assert = require('assert');
const moment = require('moment');

describe('Seaching with the found result', () => {
	
	before (() => {
		browser
			.url('/')
			.setValue('input[placeholder="Search"]', 'Pen')
			.click('button[type="submit"]');
	});
	
	it('should return 2 rows', () => {
		const rows = browser.elements('.row h4');
		assert.equal(2, rows.value.length);
    });
	
	it('should return 2 buttons "View Product"', () => {
		const buttonsNames = browser.getText('.row a[class="btn btn-primary"]');
		const expectedName = "View Product";
		assert.equal(buttonsNames.length, 2);
		buttonsNames.forEach(function (element) {
			assert.equal(expectedName, element);
		});
	});

	it('should show right count of products', () => {
		const products = browser.getText('i');
		assert.equal(products, "2 Products");
	});

	it('should show right bread crumbs', () => {
		const productName = browser.getText('li[class="active"] ');
		const categoryName = browser.getText('ol[class="breadcrumb"] li:nth-child(2)');
		const home = browser.getText('li a');
		assert.equal(productName, '"Pen"');
		assert.equal(categoryName, 'Search');
		assert.equal(home, 'Home');
	});
	
});


describe('Bread crumbs', () => {
	
	it('should return 2 rows', () => {
	    browser
			.url('/')
			.click('a[href="/?category=Books"]')
			.click('a[href="/item/19"]');
		const productName = browser.getText('li[class="active"] ');
		const categoryName = browser.getText('ol[class="breadcrumb"] li:nth-child(2)');
		const home = browser.getText('li:first-child a');
		assert.equal(productName, 'MongoDB University Book');
		assert.equal(categoryName, 'Books');
		assert.equal(home, 'Home');
    });
});

describe('Date and time of product recall', () => {
	before(() => {
		browser
			.url('/')
			.click('a[href="/?category=Books"]')
			.click('a[href="/item/19"]')
			.setValue('textarea[name="review"]', "Review")
			.setValue('input[name="name"]', 'name')
			.click('input[value="1"]')
			.click('form:nth-child(2) button[type="submit"]');
	});
	
	it('should return right name', () => {
		const comments = browser.getText('.container .row div:last-child h4');
		const name = comments[comments.length - 1].split(" ")[0];
		assert.equal(name, 'name');
	});
	
	it('should return right comment', () => {
		const comments = browser.getText('.container>.row>div>div>div');
		const text = comments[comments.length - 1].split("\n")[1];
		assert.equal(text, 'Review');
	});
	
	it('should return right date format', () => {
	
		const comments = browser.getText('.container .row div:last-child h4');
		const date = comments[comments.length - 1].split(" ").slice(1).join(" ");
		assert(moment(date, 'MMMM Do YYYY, h:m:s a').isValid());
		
	});
});
