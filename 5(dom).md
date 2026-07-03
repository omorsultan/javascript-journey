# Basics of DOM (JavaScript)

## 1. Initial Setup

- `!` → generates boilerplate HTML code (Emmet shortcut).
- Link a CSS file at the **bottom of the `<head>`**:
  ```html
  <link rel="stylesheet" href="style.css">
  ```
- Link a JS file at the **bottom of the `<body>`**:
  ```html
  <script src="script.js"></script>
  ```
- You must **reload the file** in the browser to see changes.

### Example base CSS
```css
*{
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
}

html, body{
    height: 100%;
    width: 100%;
}
```

### Example script.js
```js
console.log("Hello Bhai");
```
Output in browser console: `Hello Bhai`

---

## 2. Element Selection

### `document.querySelector()`
- Selects **any element** from the page and gives it to JavaScript.
- Returns only the **first matching element**.

```html
<h1>Hello One</h1>
<h2>Hello Two</h1>
<h3>Hello Three</h1>
```
```js
let x = document.querySelector("h1");
```

### `document.querySelectorAll()`
- Returns **all matching elements** as a `NodeList`.

```html
<h1>Hello One</h1>
<h2>Hello Two</h2>
<h1>Hello One again</h1>
```
```js
let x = document.querySelectorAll("h1");
console.log(x);
// NodeList(2) [h1, h1]
```

### Selecting by class
```html
<h1 class="yes">Hello One</h1>
<h2 class="yes">Hello Two</h2>
<h1 class="yes">Hello One again</h1>
```
```js
let x = document.querySelectorAll(".yes");
console.log(x);
// NodeList(3) [h1.yes, h2.yes, h1.yes]
```

---

## 3. Changing Styles

- Cannot do `x.style.color = red;` (unquoted) — this **does not work**.
- Must use a **string**:
  ```js
  let x = document.querySelector("h2");
  x.style.color = "red";        // ✅ works
  x.style.fontFamily = "arial"; // ✅ works
  ```
- Common error if selector doesn't match anything:
  ```
  Uncaught TypeError: Cannot set properties of undefined (setting 'color')
  ```

---

## 4. Changing Content — `innerHTML`

```js
x.innerHTML = "changed";
```
- Replaces the inner content of the selected element.

### Delayed change example
```js
// ----Want to change the text after two seconds----
setTimeout(function(){
  x.innerHTML = "Changed after two second";
}, 2000);
```

---

## 5. Event Listeners

> **Event Listeners** – agar main kisi element ko click karoon, ya fir hover karoon, ya element se mouse ko bahar kar doon, to kucch changes ho (i.e., they trigger changes on click, hover, mouse-leave, etc.)

```html
<h1 id="ele1">Pickachu</h1>
<h1 id="ele2">Chirazart</h1>
<h1 id="ele3">Mewtwo</h1>
```

### Selecting by ID
```js
let x = document.querySelector("#ele1");
x.innerHTML = "jiglypuff";
```

### Preferred way — `getElementById`
```js
// let x = document.querySelector("#ele1"); // it works
let x = document.getElementById("ele1"); // best. if not given "" it won't work

x.addEventListener('click', function(){
  x.style.color = 'yellow';
});
```

### `mousemove` event example
```js
let y = document.getElementById("ele2");

y.addEventListener('mousemove', function(){
  y.style.color = 'white';
  y.style.backgroundColor = 'orange';
});
```

---

## 6. The `document` Object

```html
<script>
  document.body.innerHTML = 'hello';
  document.title = 'Good job!';
</script>
```

- **The `document` object represents / models the webpage.**
- `document` is linked directly to the web page.
- `document` also has **methods**, e.g.:
  ```js
  document.querySelector('button');
  ```

### DOM Concept
- The **DOM combines JavaScript and HTML together**.
- One of the most important features of JavaScript: we can have **HTML elements inside JavaScript**.
- When an HTML element is placed inside JavaScript like this, **the HTML element is converted into a JavaScript object**.

```js
console.log(typeof document.body); // "object"
```
> **method** = a function saved inside an object

---

## 7. `document.querySelector()` in Depth

- Lets us get **any element** from the page and put it inside JavaScript.
- Example: `document.querySelector('button')` → gets the **first** `<button>` element on the page.
- Every HTML element has a property `.innerHTML`.

```js
console.log(document.querySelector('button').innerHTML);
```

### Changing button content
```js
document.querySelector('button').innerHTML = 'Changed';
```
Result: button text `hello` → `Changed`

---

## 8. Handling Multiple Elements — Using Classes

Problem: `querySelector` only selects the **first** matching element on the page.

```html
<button>hello</button>
<button>Second button</button>
```

**Solution:** add an **attribute** to the target element — commonly the **`class`** attribute.

```html
<button>hello</button>
<button class="js-button">Second button</button>

<script>
  console.log(document.querySelector('button').innerHTML);
  document.querySelector('button').innerHTML = 'Changed';

  console.log(document.querySelector('.js-button'));
</script>
```

- Class selectors are written as a **string**, prefixed with `.` (e.g., `.js-button`).
- **Common practice:** prefix such classes with `js-` to make it clear the class is being used **for JavaScript purposes** (not styling).
- HTML elements are JavaScript objects, so the second button is also just an **object** — and **objects are values**.

---

## 9. Saving Elements in Variables

Since objects are values, we can save them inside a variable:

```js
const buttonElement = document.querySelector('.js-button');
console.log(buttonElement);
```

---

## Quick Reference

| Task | Method |
|---|---|
| Select first matching element | `document.querySelector(selector)` |
| Select all matching elements | `document.querySelectorAll(selector)` |
| Select by ID (preferred) | `document.getElementById('id')` |
| Change style | `element.style.property = "value"` |
| Change content | `element.innerHTML = "new content"` |
| Add event listener | `element.addEventListener('event', function(){...})` |
| Delay execution | `setTimeout(function(){...}, ms)` |
| Whole page object | `document` |