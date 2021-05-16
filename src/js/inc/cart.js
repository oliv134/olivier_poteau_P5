import navbar from './navbar'

const app = {
  init () {
    navbar.refreshShopCounter(app.getProductsCount())
    const storage = app.getProducts()
    if (storage === null || storage === '') {
      localStorage.setItem('products', JSON.stringify({}))
    }
  },
  /**
   * Manage the addition of a product when clicking on the shopping cart button
   *
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
   * Transmet dans l'objet la liste des produits contenus dans localStorage
   * @returns { object}
   */
  getProducts () {
    return localStorage.getItem('products') ?? '{}'
  },
  /**
   * Displays the product lines in the cart table with the information retrieved earlier
   *
   * @param {Object} product
   * @param {number} count
   */
  displayProduct: function (product, count) {
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
    quantityInput.value = count

    // Product total price
    templateClone.querySelector('.product__total').textContent = ((product.price / 100) * count)

    targetElement.appendChild(templateClone)

    // Update products summary
    app.updateSum()
  },
  /**
     * Delete the product row in the cart table using the input field element
     *
     * @param {Object} inputElement
     */
  deleteProductRow: function (inputElement) {
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
     *
     * @param {Object} inputElement
     */
  updateProductRow: function (inputElement) {
    const productRow = inputElement.closest('.product__row')
    const productPrice = productRow.querySelector('.product__price')

    // Updates the number of items in the localStorage
    productRow.querySelector('.product__total').textContent = (productPrice.textContent.replace('€', '') * inputElement.value) + '€'
    app.updateProductCount(productRow.dataset.id, inputElement.value)

    // Refreshes the item counters on the navbar and the title
    navbar.refreshShopCounter(app.getProductsCount())
    // Updates the product summary
    app.updateSum()
  },
  /**
     * Updates the summary of products in the cart
     */
  updateSum: function () {
    const totals = document.getElementsByClassName('product__total')
    let productsPrice = 0

    // Add all the total prices of the products
    for (const total of totals) {
      productsPrice += parseInt(total.textContent.replace('€', ''), 10)
    }

    // Updates the subtotal and total in the summary
    document.querySelector('.subtotal__price').textContent = '€ ' + productsPrice
    document.querySelector('.total__price').textContent = '€ ' + productsPrice
  },

  /**
   * Retourne le total des produits contenus dans le localStorage
   *
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
   *
   * @param {string} productId
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
   * Updates the item count for a product with the given id
   *
   * @param {string} productId
   * @param {number} count
   */
  updateProductCount (productId, count) {
    const products = JSON.parse(app.getProducts())
    products[productId] = count
    localStorage.setItem('products', JSON.stringify(products))
  },

  /** fetchProduct
   * Efface un produit defini par son id
   *
   * @param {string} productId
   */
  deleteProduct (productId) {
    const products = JSON.parse(app.getProducts())
    delete products[productId]
    localStorage.setItem('products', JSON.stringify(products))
  },

  /**
   * Checks if the product object in localStorage is emptyfetchProduct
   *
   * @returns {boolean}
   */
  productsIsEmpty () {
    /* const products = JSON.parse(localStorageData.getProducts())
    let propertiesCounter = 0

    // Adds the number of properties of the product object
    for (const product in products) {
      propertiesCounter++
    }

    // return propertiesCounter === 0 */
    return app.getProductsCount === 0
    // return localStorage.getItem("products") === null)
  },
  /**
   * Handles the quantity change in the input field of each of the products present in the cart table
   *
   * @param {Event} event
   */
  handleQuantityChange: function (event) {
    const inputElement = event.target
    if (inputElement.value <= 0) {
      app.deleteProductRow(inputElement)
    } else {
      app.updateProductRow(inputElement)
    }
  },

  /**
   * Subtracts the quantity from the input element and triggers the associated 'change' event
   *
   * @param {MouseEvent} event
   */
  handleLessButtonClick: function (event) {
    event.preventDefault()
    const quantityInput = event.target.parentNode.parentNode.querySelector('#quantity')
    quantityInput.value--

    // Triggers the 'change' event linked to the input element
    const changeEvent = new Event('change')
    quantityInput.dispatchEvent(changeEvent)
  },

  /**
   * Adds the quantity from the input element and triggers the associated 'change' event
   *
   * @param {MouseEvent} event
   */
  handleMoreButtonClick: function (event) {
    event.preventDefault()
    const quantityInput = event.target.parentNode.parentNode.querySelector('#quantity')
    quantityInput.value++

    // Triggers the 'change' event linked to the input element
    const changeEvent = new Event('change')
    quantityInput.dispatchEvent(changeEvent)
  },
  /**
   * Adds the quantity from the input element and triggers the associated 'change' event
   *
   * @param {MouseEvent} event
   */
  handleTrashButtonClick: function (event) {
    const inputElement = event.target

    app.deleteProductRow(inputElement)
  }
}

export default app
