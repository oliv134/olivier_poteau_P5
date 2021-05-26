import navbar from './navbar'

const app = {
  /**
   * Basket initialization
   * Refresh the item counter in the navbar and define an item products in the local strorage if absent
   * @function init
   */
  init () {
    const storage = app.getProducts()
    if (storage === null || storage === '') {
      localStorage.setItem('products', JSON.stringify({}))
    }
    navbar.refreshShopCounter(app.getProductsCount())
  },
  /**
   * Returns the products id contained in the localstorage
   * @function getProducts
   * @returns {object}
   */
  getProducts () {
    return localStorage.getItem('products') ?? '{}'
  },
  /**
   * Add a product in a the cart table row
   * @function displayProduct
   * @param {Object} product
   * @param {number} count
   */
  displayProduct (product) {
    const template = document.querySelector('#cart__row')
    const targetElement = document.querySelector('#cart__products')

    // Create a clone of the template and fill in all the information collected earlier
    const templateClone = document.importNode(template.content, true)

    // Product id
    templateClone.querySelector('.product__row').dataset.id = product._id

    // Product image
    templateClone.querySelector('.product__image').src = product.imageUrl

    // Product name
    templateClone.querySelector('.product__name').textContent = product.name

    // Product price
    templateClone.querySelector('.product__price').textContent = product.price / 100

    // Product quantity buttons and input
    const quantityInput = templateClone.querySelector('#quantity')
    quantityInput.addEventListener('change', app.handleQuantityChange)
    templateClone.querySelector('.product__quantity .minus').addEventListener('click', app.handleLessButtonClick)
    templateClone.querySelector('.product__quantity .plus').addEventListener('click', app.handleMoreButtonClick)
    templateClone.querySelector('.trash').addEventListener('click', app.handleTrashButtonClick)
    quantityInput.value = product.count

    // Product total price
    templateClone.querySelector('.product__total').textContent = ((product.price / 100) * product.count)

    targetElement.appendChild(templateClone)

    // Update products summary
    app.updateSum()
  },
  /**
   * Delete the product row in the cart table using the input field element
   * @function deleteProductRow
   * @param {Object} inputElement
  */
  deleteProductRow (inputElement) {
    const productRow = inputElement.closest('.product__row')

    // Deletes the product in the localStorage associated with the identifier
    app.deleteProduct(productRow.dataset.id)
    // Removes the entire row of the product from the table
    productRow.remove()
    // Refreshes the item counters on the navbar and the title
    navbar.refreshShopCounter(app.getProductsCount())
    // Updates the product summary
    app.updateSum()
  },
  /**
   * Updates the product line in the cart table
   * @function updateProductRow
   * @param {Object} inputElement
  */
  updateProductRow (inputElement) {
    const productRow = inputElement.closest('.product__row')
    const productPrice = productRow.querySelector('.product__price')

    // Updates the number of items in the localStorage
    productRow.querySelector('.product__total').textContent = (productPrice.textContent.replace('€', '') * inputElement.value) + '€'
    app.updateProductCount(productRow.dataset.id, inputElement.value)

    // Refreshes the item counters on the navbar and the title
    navbar.refreshShopCounter(app.getProductsCount())
    // Updates the product summary
  },
  /**
   * Updates the subtotal and total in the summary
   * @function updateSum
  */
  updateSum () {
    const productsTotal = app.getProductsCount()

    if (productsTotal === 0) {
      document.getElementById('cart__show').classList.add('d-none')
      document.getElementById('cart__identity').classList.add('d-none')
      document.getElementById('cart__no').classList.remove('d-none')
    } else {
      const totals = document.getElementsByClassName('product__total')
      let productsPrice = 0

      // Add all the total prices of the products
      for (const total of totals) {
        productsPrice += parseInt(total.textContent.replace('€', ''), 10)
      }

      document.querySelector('.products__total').textContent = productsTotal + ' article' + (productsTotal > 1 ? 's' : '')
      document.querySelector('.subtotal__price').textContent = '€ ' + productsPrice
      document.querySelector('.total__price').textContent = '€ ' + productsPrice
    }
  },

  /**
   * Returns the total of the products contained in the localStorage
   * @function getProductsCount
   * @returns {number} result
   */
  getProductsCount () {
    const products = JSON.parse(app.getProducts())
    let result = 0
    for (const p in products) {
      result += parseInt(products[p], 10)
    }
    return result
  },
  /**
   * Adds a product to localStorage by incrementing the value or creating a new
   * key-value association
   * @function addProduct
   * @param {string} productId Prodyct Id
   */
  addProduct (productId) {
    const products = JSON.parse(app.getProducts())

    if (typeof products[productId] === 'undefined') {
      products[productId] = 1
    } else {
      products[productId]++
    }

    localStorage.setItem('products', JSON.stringify(products))
  },

  /**
   * Updates the localstorage with the number of items for a product with the given ID
   * @function updateProductCount
   * @param {string} productId Product ID
   * @param {number} count Number of products
   */
  updateProductCount (productId, count) {
    const products = JSON.parse(app.getProducts())
    products[productId] = count
    localStorage.setItem('products', JSON.stringify(products))
  },

  /**
   * Removes from localstorage a product with the given ID
   * @function deleteProduct
   * @param {string} productId Product ID
   */
  deleteProduct (productId) {
    const products = JSON.parse(app.getProducts())
    delete products[productId]
    localStorage.setItem('products', JSON.stringify(products))
  },

  /**
   * Manage the addition of a product when clicking on the shopping cart button
   * @function handleShopButtonClick
   * @param {MouseEvent} event
   */
  handleShopButtonClick (event) {
    // Remove default behavior of link
    event.preventDefault()

    // Add product to localStorage
    app.addProduct(this.dataset.id)

    // Refreshes the cart counters
    navbar.refreshShopCounter(app.getProductsCount())
  },
  /**
   * Handles the quantity change in the input field of each of the products present in the cart table
   * @function handleQuantityChange
   * @param {Event} event
   */
  handleQuantityChange (event) {
    const inputElement = event.target
    if (inputElement.value <= 0) {
      app.deleteProductRow(inputElement)
    } else {
      app.updateProductRow(inputElement)
    }
    // Updates the product summary
    app.updateSum()
  },

  /**
   * Subtracts the quantity from the input element and triggers the associated 'change' event
   * @funciton handleLessButtonClick
   * @param {MouseEvent} event
   */
  handleLessButtonClick (event) {
    event.preventDefault()
    const quantityInput = event.target.parentNode.parentNode.querySelector('#quantity')
    quantityInput.value--

    // Triggers the 'change' event linked to the input element
    const changeEvent = new Event('change')
    quantityInput.dispatchEvent(changeEvent)
  },

  /**
   * Adds the quantity from the input element and triggers the associated 'change' event
   * @funciton handleMoreButtonClick
   * @param {MouseEvent} event
   */
  handleMoreButtonClick (event) {
    event.preventDefault()
    const quantityInput = event.target.parentNode.parentNode.querySelector('#quantity')
    quantityInput.value++

    // Triggers the 'change' event linked to the input element
    const changeEvent = new Event('change')
    quantityInput.dispatchEvent(changeEvent)
  },
  /**
   * Adds the quantity from the input element and triggers the associated 'change' event
   * @function handleTrashButtonClick
   * @param {MouseEvent} event
   */
  handleTrashButtonClick (event) {
    const inputElement = event.target
    app.deleteProductRow(inputElement)
  }
}

export default app
