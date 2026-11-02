document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
    { id: 4, name: "Product 4", price: 39.99 },
  ];

  // cart.forEach((item) => {
  //   console.log("item pushed to cart at the beginning of the program:", item);
  //   addToCart(item);
  // });
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
  productList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      console.log(product);
      addToCart(product);
    }
  });
  function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    if (cart.length) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <button data-id="${item.id}">Remove</button>`;
        cartItems.appendChild(cartItem);
        const removeButton = cartItem.querySelector("button");
        removeButton.addEventListener("click", (e) => {
          e.stopPropagation();
          removeItemFromCart(item);
        });
        totalPriceDisplay.textContent = totalPrice.toFixed(2);
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = "0.00";
    }
  }
  function removeItemFromCart(item) {
    console.log("Removing item from cart:", item);
    cart = cart.filter((p) => p.id !== item.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
  checkoutButton.addEventListener("click", () => {
    cart.length = 0; // Clear the cart
    localStorage.removeItem("cart");
    renderCart();
    totalPriceDisplay.textContent = "0.00";
    alert("Checkout successful! Thank you for your purchase.");
  });
});
