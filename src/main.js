
import "./style.css";

import { renderLayout } from "./components/layout.js";
import { renderProducts } from "./components/product.js";
import { renderCart, setupCartEvents } from "./components/cart.js";

import {
  renderSuccessModal,
  setupSuccessEvents,
} from "./checkout/success.js";

import {
  renderCheckoutModal,
  setupCheckout,
  openCheckoutModal,
} from "./checkout/checkout.js";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

async function initApp() {

  // Layout
  renderLayout();

  // Footer Year
  const footerYear = document.querySelector("#footerYear");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Success Modal
  renderSuccessModal();
  setupSuccessEvents();

  // Products
  renderProducts();

  // Cart
  setupCartEvents();
  renderCart();

  // Checkout Modal
  await renderCheckoutModal();
  setupCheckout(SERVER_URL);

}

initApp().catch((error) => {
  console.error("App Initialization Error:", error);
});
