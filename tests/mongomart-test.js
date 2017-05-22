const assert = require('assert');
const moment = require('moment');

describe('Searching with the found result', () => {
	
	before (() => {
		browser
			.url('/')
			.setValue('input[class="form-control"]', 'Pen')
			.click('button[class="btn btn-default"]');
	});
	
	it('should check that the description or the title has words from a search', () => {
		var request = "pen";
		const products_descriptions = browser.getText('.col-md-5');
		products_descriptions.forEach(description => {
			var description = description.toLowerCase();
			var tmp = description.split('\n').map(row => row.split(' '));
			var words = tmp[0].concat(tmp[1]);
			assert(words.indexOf(request) !== -1);
		});
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
});


describe('Bread crumbs', () => {
	it('should show right bread crumbs when looking for a product', () => {
		browser
			.url('/')
			.setValue('input[class="form-control"]', 'Pen')
			.click('button[class="btn btn-default"]');
		const productName = browser.getText('li[class="active"] ');
		const categoryName = browser.getText('ol[class="breadcrumb"] li:nth-child(2)');
		const home = browser.getText('li a');
		assert.equal(productName, '"Pen"');
		assert.equal(categoryName, 'Search');
		assert.equal(home, 'Home');
	});
	
	it('should show right bread crumbs for navigate to the product card', () => {
	    browser.url("/item/19");
		const productName = browser.getText('li[class="active"] ');
		const categoryName = browser.getText('ol[class="breadcrumb"] li:nth-child(2)');
		const home = browser.getText('li:first-child a');
		assert.equal(productName, 'MongoDB University Book');
		assert.equal(categoryName, 'Books');
		assert.equal(home, 'Home');
    });
	
	it('should show right bread crumbs in cart', () => {
	    browser
			.url('/')
			.click('button[class="btn btn-success"]');
		const home = browser.getText('ol[class="breadcrumb"] li:first-child a');
		const cart = browser.getText('li[class="active"] ');
		assert.equal(cart, "Cart");
		assert.equal(home, 'Home');
    });
	
	it('should show right bread crumbs in category', () => {
	    browser.url('/?category=Books');
		const home = browser.getText('ol[class="breadcrumb"] li:first-child a');
		const categoryName = browser.getText('li[class="active"] ');
		assert.equal(categoryName, "Books");
		assert.equal(home, 'Home');
    });
	
	it('should show right bread crumbs on the main page', () => {
		browser.url('/');
		const home = browser.getText('ol[class="breadcrumb"] li:first-child a');
		const all = browser.getText('ol li[class="active"] ');
		assert.equal(all, "All");
		assert.equal(home, 'Home');
    });
});

describe('Date and time of product recall', () => {
	var reviewDate;
	before(() => {
		browser
			.url('/item/19')
			.setValue('textarea[name="review"]', "Review")
			.setValue('input[name="name"]', 'name')
			.click('input[value="1"]')
			.click('form:nth-child(2) button[type="submit"]');
			reviewDate = new Date();
	});
	
	it('should return right name', () => {
		const comments = browser.getText('.container .row div:last-child .media-heading');
		const name = comments[comments.length - 1].split(" ")[0];
		assert.equal(name, 'name');
	});
	
	it('should return right comment', () => {
		const comments = browser.getText('.container>.row>div>div>div');
		const text = comments[comments.length - 1].split("\n")[1];
		assert.equal(text, 'Review');
	});
	
	it('should return right date format', () => {
	
		const comments = browser.getText('.container .row div:last-child .media-heading');
		const date = comments[comments.length - 1].split(" ").slice(1).join(" ");
		assert(moment(date, 'MMMM Do YYYY, h:m:s a').isValid());
		
	});
	
	it('should return right time', () => {
        const comments = browser.getText('.container .row div:last-child .media-heading');
        var date = comments[comments.length - 1].split(" ").slice(1).join(" ");
        date = new Date(moment.utc(date, 'MMMM Do YYYY, h:m:s a'));
		assert(Math.abs(date - reviewDate) < 30 * 1000);
	});
});

