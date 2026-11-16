import "./style.css";

import { renderLayout } from "./components/layout.js";
import { renderProducts } from "./components/product.js";
import { renderCart, setupCartEvents } from "./components/cart.js";

import { renderSuccessModal, setupSuccessEvents } from "./checkout/success.js";

import {
  renderCheckoutModal,
  setupCheckout,
  openCheckoutModal,
} from "./checkout/checkout.js";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

async function initApp() {
  // Layout
  renderLayout();

  const meritVideo = document.getElementById("meritVideo");
  const meritVideoSource = document.getElementById("meritVideoSource");

  if (meritVideo && meritVideoSource) {
    const VIDEO_URL = import.meta.env.VITE_VIDEO_URL;

    if (VIDEO_URL) {
      meritVideoSource.src = VIDEO_URL;
      meritVideo.load();

      meritVideo.muted = true;
      meritVideo.volume = 1;

      meritVideo.play().catch((error) => {
        console.error("Video Autoplay Error:", error);
      });
    } else {
      console.error("VITE_VIDEO_URL not found!");
    }
  }

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
