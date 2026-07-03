# JavaScript Amazon Project — Lesson 13

## Resources
- **Starting code:** https://github.com/SuperSimpleDev/javascript-amazon-project
- **Git installation:** https://git-scm.com/downloads
- **Git and GitHub Full Course:** https://youtu.be/hrTQipWp6co

---

## 1. Core Concepts

- We can build **almost the entire website** using **just HTML and CSS**.
- **JavaScript makes the website interactive.**
- **Git** = a tool to **track changes** in our code.

---

## 2. Representing Data — Array of Objects

An **array** represents a **list**, and each **object** inside it represents one item (e.g., one product).

```js
const products = [{

}]; // this is a list of a object. and array represent a list
```

### Filling in one product
```js
const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: { // rating has two properties, so we use an object
    stars: 4.5,
    count: 87
  },
  price: 10.90
}]; // this is a list of an object. and array represents a list
```

---

## 3. Floating Point Problem & Best Practice

- **JavaScript has problems doing math with floats:**
  ```js
  0.1 + 0.2
  // 0.30000000000000004
  ```
- **Best practice when calculating money:** *Calculate in cents* (use integers, not decimals).

### Applying it — `priceCents` instead of `price`
```js
const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: { // rating has two properties, so we use an object
    stars: 4.5,
    count: 87
  },
  priceCents: 1090
}, // it is the data for the first product; now another object for the 2nd product
{
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095
}
]; // this is a list of an object. and array represents a list
```

---

## 4. Main Idea of JavaScript

1. **Save the data**
2. **Generate the HTML**
3. **Make it interactive**

- The `products` array holds everything we need to display on the page — this is called a **data structure**.
- A **data structure** structures/organizes the data — here it represents a **list of products**.

---

## 5. Generating HTML — Looping Through Data

Instead of writing HTML manually, we **loop through the array** to generate the HTML for each product.

### Step 1: Loop using `forEach`
```js
products.forEach(); // loop through this array using a for each method
```

### Step 2: Pass a function with a parameter
```js
products.forEach((product) => { // inside, create a function, pass parameter product

}); // loop through this array using a for each method
```

### Step 3: Prepare a variable to hold the HTML
```js
products.forEach((product) => { // inside create a function, pass parameter product
  // check korbo product er html code kothai ache,
  // otake hover kore then html code e class ta
  // search korbo. poro code ta copy korbo
  const html = ``; // ekhane paste korbo

}); // loop through this array using a for each method
```

### Step 4: Paste the matching HTML template inside the template literal
```js
const html = `<div class="product-container">
  ...
  <div class="added-to-cart">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary">
    Add to Cart
  </button>
</div>`; // ekhane paste korbo
// tab press kore indexing thik rakhbo
console.log(html); // kaj korche kina check?
```

> **Tip:** After pasting, press **Tab** to fix the indentation. Use `console.log(html)` to verify it's working.

---

## 6. Injecting Dynamic Values with Template Literals

Replace hardcoded values inside the HTML with `${...}` expressions referencing the current `product`.

```html
<div class="product-image-container">
  <img class="product-image"
    src="images/products/athletic-cotton-socks-6-pairs.jpg">
</div>
```

⬇ becomes dynamic:

```html
<div class="product-image-container">
  <img class="product-image"
    src="${product.image}">
</div>

<div class="product-name">
```

---

## 7. Combining HTML for All Products

- **Combine all the generated HTML together** into one string.
- Search for the matching code block, then copy it.

```js
productsHTML += `<div class="product-container">
  <div class="product-image-container">
```

### Accumulator Pattern
```js
// this is accumulator pattern. we are adding result
productsHTML += `<div class="product-container">
  ...
```

- The goal: **take this HTML and put it on the web page**.

---

## 8. Injecting the Generated HTML into the Page

```html
<div class="main">
  <div class="products-grid"> <!-- We need to use dom in here, not below,
  because below is generated in our loop -->
    <div class="product-container">...</div>
    <div class="product-container">...</div>
  </div>
</div>
```

### Adding a JS hook class
```html
<div class="main">
  <div class="products-grid js-products-grid"> <!-- We need to use dom
  in here, not the below; because below are generated in the loop -->
```

### Selecting — common mistake vs. correct usage
```js
document.querySelector('js-products-grid')
  .innerHTML = productsHTML; // not worked (missing the dot prefix)
```

```js
document.querySelector('.js-products-grid')
  .innerHTML = productsHTML; // worked — needs the "." for class selector
```

---

## 9. Displaying Price Correctly

Since price is stored in **cents**, convert it back to dollars for display, and round to 2 decimal places:

```html
<div class="product-price">
  $${(product.priceCents / 100).toFixed(2)}
</div>
```

**Result:**
```
$10.90
```

---

## 10. Project File Structure

```
JAVASCRIPT-AMAZO...
├── backend
├── data
│   └── products.js
├── images
├── scripts
│   └── amazon.js
├── styles
├── amazon.html
├── checkout.html
├── orders.html
└── tracking.html
```

### Sample `products.js`
```js
const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [...]
  },
  ...
];
```

### Loading scripts in the correct order (in `amazon.html`)
```html
<script src="data/products.js"></script>
<!--it will run one by one: 1st load data, then go to amazon.js.
so now we delete the products array in amazon.js-->
<script src="scripts/amazon.js"></script>
</body>
</html>
```

> Since `data/products.js` is loaded **before** `scripts/amazon.js`, the `products` array becomes available globally — so it can be **removed** from `amazon.js` and kept only in `products.js`.

---

## Quick Reference

| Concept | Key Point |
|---|---|
| Data structure | Array of objects — each object = one product |
| Money math | Store prices as **cents** (integers) to avoid float errors |
| Main JS flow | 1. Save data → 2. Generate HTML → 3. Make interactive |
| Loop through array | `array.forEach((item) => {...})` |
| Build HTML string | Template literals with `${...}` for dynamic values |
| Combine multiple items | Accumulator pattern: `htmlString += \`...\`` |
| Inject into page | `document.querySelector('.class-name').innerHTML = htmlString` |
| Display price | `(priceCents / 100).toFixed(2)` |
| Script load order | Data file first, then logic file, so data is available globally |