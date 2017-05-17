const assert = require('assert')
const url = 'http://urfu-2016-testing.herokuapp.com/'

describe('Search', () => {
  it('should show 1 products for searching "ball"', () => {
    browser.url(url)
      .setValue('input[name=query]', 'ball')
      .click('.btn-default')
    const products = browser.elements('.img-responsive')

    assert.equal(products.value.length, 1)
  })
})

describe('Breadcrumbs', () => {
  it('Should show "Home/Search/\"ball\"" bc after search', () => {
    browser.url(url)
      .setValue('input[name=query]', 'ball')
      .click('.btn-default')

    const bc = browser.getText('.breadcrumb li')

    assert.equal(bc.length, 3)
    assert.equal(bc[0], 'Home')
    assert.equal(bc[1], 'Search')
    assert.equal(bc[2], '"ball"')
  })

  it('Should show on root page', () => {
    browser.url(url)

    const bc = browser.getText('.breadcrumb li')

    assert.equal(bc.length, 2)
    assert.equal(bc[0], 'Home')
    assert.equal(bc[1], 'All')
  })

  it('Should show on product show page', () => {
    browser.url(url + 'item/1')

    const bc = browser.getText('.breadcrumb li')

    assert.equal(bc.length, 3)
    assert.equal(bc[0], 'Home')
    assert.equal(bc[1], 'Apparel')
    assert.equal(bc[2], 'Gray Hooded Sweatshirt')
  })

  it('Should show on category page', () => {
    const category = 'Apparel'
    browser.url(url + `?category=${category}`)

    const bc = browser.getText('.breadcrumb li')

    assert.equal(bc.length, 2)
    assert.equal(bc[0], 'Home')
    assert.equal(bc[1], category)
  })
})

describe('Create Review', () => {
  const reviewAuthor = 'John Doe'
  const reviewBody = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'

  before(() => {
    browser.timeouts
    browser.url(url + 'item/4')
      .setValue('.well .form-group textarea[name=review]', reviewBody)
      .setValue('.well .form-group input[name=name]', reviewAuthor)
      .click('.well .btn-primary')
  })

  it('Creates review with filled values', () => {
    const authors = browser.getText('.media-heading')
    const lastReviewAuthor = authors[authors.length - 1].split(' ').slice(0, 2).join(' ')

    const comments = browser.getText('.row > .row > div > div > div')
    const lastReviewBody = comments[comments.length - 1].split('\n')[1]

    assert.equal(lastReviewAuthor, reviewAuthor)
    assert.equal(lastReviewBody, reviewBody)
  })
})
