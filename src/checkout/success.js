import html2pdf from "html2pdf.js";

// =================================
// SUCCESS MODAL
// =================================

export function renderSuccessModal() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="successModal"
      class="fixed inset-0 z-[120] hidden items-center justify-center bg-black/60 p-2 backdrop-blur-sm">

      <div class="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        <!-- Header -->
        <div class="relative bg-gradient-to-br from-green-600 to-emerald-700 px-4 py-6 text-center text-white">

          <button id="closeSuccessModal"
            class="absolute right-5 top-5 text-2xl text-white/80 transition hover:text-white">
            &times;
          </button>

          <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-5xl text-green-600 shadow-lg">
            ✓
          </div>

          <h2 class="mt-2 text-3xl font-bold">
            অর্ডার সফল হয়েছে!
          </h2>

          <p class="mt-3 text-green-100">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
          </p>

          <p class="mt-2 text-sm text-green-100">
            মেরিট কেয়ার একাডেমির সঙ্গে থাকার জন্য ধন্যবাদ।
          </p>

        </div>


        <!-- Content -->
        <div class="overflow-y-auto p-5 md:p-8">

          <!-- Order Info -->
          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div class="flex flex-wrap items-center justify-between gap-3">

              <div>
                <p class="text-sm text-slate-500">
                  অর্ডার নম্বর
                </p>

                <h3 id="successOrderId"
                  class="mt-1 text-xl font-bold text-blue-950">
                  -
                </h3>
              </div>

              <span class="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
                অর্ডার স্ট্যাটাস: অপেক্ষমাণ
              </span>

            </div>

            <div class="mt-4 border-t pt-4">
              <p class="text-sm text-slate-500">
                অর্ডারের তারিখ
              </p>

              <p id="successOrderDate"
                class="mt-1 font-semibold text-slate-800">
                -
              </p>
            </div>

          </div>


          <!-- Customer Information -->
          <div class="mt-6">

            <h3 class="mb-4 text-xl font-bold text-blue-950">
              গ্রাহকের তথ্য
            </h3>

            <div class="grid gap-4 sm:grid-cols-2">

              <div class="rounded-xl border p-4">
                <p class="text-sm text-slate-500">গ্রাহকের নাম</p>
                <p id="successCustomerName"
                  class="mt-1 font-semibold text-slate-800">
                  -
                </p>
              </div>

              <div class="rounded-xl border p-4">
                <p class="text-sm text-slate-500">মোবাইল নম্বর</p>
                <p id="successCustomerPhone"
                  class="mt-1 font-semibold text-slate-800">
                  -
                </p>
              </div>

              <div class="rounded-xl border p-4">
                <p class="text-sm text-slate-500">জেলা</p>
                <p id="successDistrict"
                  class="mt-1 font-semibold text-slate-800">
                  -
                </p>
              </div>

              <div class="rounded-xl border p-4">
                <p class="text-sm text-slate-500">উপজেলা / থানা</p>
                <p id="successUpazila"
                  class="mt-1 font-semibold text-slate-800">
                  -
                </p>
              </div>

              <div class="rounded-xl border p-4 sm:col-span-2">
                <p class="text-sm text-slate-500">সম্পূর্ণ ঠিকানা</p>
                <p id="successAddress"
                  class="mt-1 font-semibold leading-7 text-slate-800">
                  -
                </p>
              </div>

              <div class="rounded-xl border p-4 sm:col-span-2">
                <p class="text-sm text-slate-500">পেমেন্ট পদ্ধতি</p>
                <p id="successPayment"
                  class="mt-1 font-semibold text-slate-800">
                  -
                </p>
              </div>

            </div>

          </div>


          <!-- Products -->
          <div class="mt-8">

            <h3 class="mb-4 text-xl font-bold text-blue-950">
              অর্ডার করা পণ্যসমূহ
            </h3>

            <div class="overflow-x-auto rounded-xl border">

              <table class="w-full min-w-[450px] text-left text-sm">

                <thead class="bg-blue-950 text-white">
                  <tr>
                    <th class="px-4 py-4">পণ্যের নাম</th>
                    <th class="px-4 py-4 text-center">পরিমাণ</th>
                    <th class="px-4 py-4 text-right">মূল্য</th>
                    <th class="px-4 py-4 text-right">মোট</th>
                  </tr>
                </thead>

                <tbody id="successProducts"
                  class="divide-y divide-slate-200">
                </tbody>

              </table>

            </div>

          </div>


          <!-- Total -->
          <div class="mt-6 rounded-2xl bg-slate-50 p-5">

            <div class="flex justify-between py-2 text-slate-600">
              <span>পণ্যের মোট মূল্য</span>
              <span id="successSubtotal">৳0</span>
            </div>

            <div class="flex justify-between py-2 text-slate-600">
              <span>ডেলিভারি চার্জ</span>
              <span id="successDelivery">৳0</span>
            </div>

            <div class="mt-3 flex justify-between border-t pt-4 text-xl font-bold text-blue-950">
              <span>সর্বমোট</span>
              <span id="successTotal">৳0</span>
            </div>

          </div>


          <!-- PDF Download -->
          <button id="downloadOrderPDF"
            class="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-950 py-4 font-bold text-white transition hover:bg-blue-800 active:scale-[0.98]">

            <span class="text-xl">↓</span>
            অর্ডারের PDF ডাউনলোড করুন

          </button>

          <p class="mt-3 text-center text-xs text-slate-500">
            আপনার অর্ডারের সম্পূর্ণ বিবরণ PDF ফাইল হিসেবে সংরক্ষণ করুন।
          </p>

        </div>


        <!-- Footer -->
        <div class="border-t bg-white p-5">

          <button id="newOrderButton"
            class="w-full rounded-xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600">
            আরও অর্ডার করুন →
          </button>

        </div>

      </div>
    </div>


    <!-- PDF Invoice Template -->
   
<!-- Compact Invoice Template -->
<div
  id="pdfInvoice"
  style="
    position:absolute;
    left:-10000px;
    top:0;
    width:302px;
    box-sizing:border-box;
    padding:14px;
    background:#ffffff;
    color:#1e293b;
    font-family:'Noto Sans Bengali',sans-serif;
    font-size:12px;
    line-height:1.6;
    overflow:visible;
    pointer-events:none;
  "
>
  <!-- Header -->
  <div style="text-align:center;border-bottom:2px solid #172554;padding-bottom:10px;">
    <h1 style="font-size:17px;font-weight:700;color:#172554;margin:0;">
      মেরিট কেয়ার একাডেমি
    </h1>

    <p style="font-size:10px;margin:3px 0;color:#64748b;">
      অ্যান্ড পাবলিকেশন্স
    </p>

    <p style="font-size:10px;margin:0;color:#64748b;">
      স্বপ্ন বিনির্মাণে দৃঢ় প্রত্যয়ী
    </p>

    <h2 style="font-size:15px;font-weight:700;color:#ea580c;margin:10px 0 0;">
      অর্ডার ইনভয়েস
    </h2>
  </div>

  <!-- Order Info -->
  <div id="pdfOrderInfo" style="margin-top:10px;line-height:1.8;"></div>

  <!-- Customer -->
  <div style="margin-top:10px;border-top:1px dashed #cbd5e1;padding-top:8px;">
    <h3 style="font-size:13px;font-weight:700;margin:0 0 5px;color:#172554;">
      গ্রাহকের তথ্য
    </h3>

    <div id="pdfCustomerInfo" style="line-height:1.8;overflow-wrap:anywhere;"></div>
  </div>

  <!-- Products -->
  <div style="margin-top:10px;border-top:1px dashed #cbd5e1;padding-top:8px;">
    <h3 style="font-size:13px;font-weight:700;margin:0 0 6px;color:#172554;">
      পণ্যসমূহ
    </h3>

    <table
      style="
        width:100%;
        table-layout:fixed;
        border-collapse:collapse;
        font-size:10px;
      "
    >
      <thead>
        <tr style="background:#172554;color:#ffffff;">
          <th style="width:44%;padding:5px 2px;text-align:center;border:1px solid #cbd5e1;">
            পণ্য
          </th>

          <th style="width:12%;padding:5px 1px;text-align:center;border:1px solid #cbd5e1;">
            পরি.
          </th>

          <th style="width:22%;padding:5px 1px;text-align:center;border:1px solid #cbd5e1;">
            মূল্য
          </th>

          <th style="width:22%;padding:5px 1px;text-align:center;border:1px solid #cbd5e1;">
            মোট
          </th>
        </tr>
      </thead>

      <tbody id="pdfProducts"></tbody>
    </table>
  </div>

  <!-- Total -->
  <div
    id="pdfTotal"
    style="
      margin-top:10px;
      padding-top:8px;
      border-top:1px dashed #cbd5e1;
      text-align:right;
      line-height:1.9;
    "
  ></div>

  <!-- Footer -->
  <div
    style="
      margin-top:15px;
      border-top:1px solid #cbd5e1;
      padding-top:8px;
      text-align:center;
      color:#64748b;
      font-size:10px;
    "
  >
    অর্ডার করার জন্য ধন্যবাদ।<br>
    মেরিট কেয়ার একাডেমি অ্যান্ড পাবলিকেশন্স
  </div>
</div>

    `,
  );
}

// =================================
// SHOW SUCCESS MODAL
// =================================

export function showSuccessModal(order) {
  const successModal = document.querySelector("#successModal");

  if (!successModal || !order) return;

  const customer = order.customer || {};

  const products = order.products || [];

  const orderDate = new Date(order.createdAt || Date.now());

  const formatDate = (date) =>
    new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);

  const money = (amount) => `৳${Number(amount || 0).toLocaleString("en-BD")}`;

  const setText = (id, value) => {
    const element = document.querySelector(`#${id}`);

    if (element) element.textContent = value || "-";
  };

  // Order Information
  setText("successOrderId", order.orderId);

  setText("successOrderDate", formatDate(orderDate));

  // Customer Information
  setText("successCustomerName", customer.name);

  setText("successCustomerPhone", customer.phone);

  setText("successDistrict", customer.district);

  setText("successUpazila", customer.upazila);

  setText("successAddress", customer.address);

  setText(
    "successPayment",
    customer.payment === "COD" ? "ক্যাশ অন ডেলিভারি" : "অগ্রিম পেমেন্ট",
  );

  // Products

  // Products - Success Modal
  const successProducts = document.querySelector("#successProducts");

  if (successProducts) {
    successProducts.innerHTML = products
      .map(
        (item) => `
        <tr>
          <td class="px-4 py-3 font-medium text-slate-800">
            ${item.name}
          </td>

          <td class="px-4 py-3 text-center">
            ${item.quantity}
          </td>

          <td class="px-4 py-3 text-right">
            ${money(item.price)}
          </td>

          <td class="px-4 py-3 text-right font-semibold">
            ${money(item.price * item.quantity)}
          </td>
        </tr>
      `,
      )
      .join("");
  }

  // Total
  setText("successSubtotal", money(order.subtotal));

  setText("successDelivery", money(order.delivery));

  setText("successTotal", money(order.total));

  // PDF Invoice
  const pdfOrderInfo = document.querySelector("#pdfOrderInfo");

  const pdfCustomerInfo = document.querySelector("#pdfCustomerInfo");

  const pdfProducts = document.querySelector("#pdfProducts");

  const pdfTotal = document.querySelector("#pdfTotal");

  if (pdfOrderInfo) {
    pdfOrderInfo.innerHTML = `
      <strong>অর্ডার নম্বর:</strong> ${order.orderId}<br>
      <strong>অর্ডারের তারিখ:</strong> ${formatDate(orderDate)}<br>
      <strong>অর্ডার স্ট্যাটাস:</strong> অপেক্ষমাণ
    `;
  }

  // data concol e dekhar comand
  console.log(order);

  if (pdfCustomerInfo) {
    pdfCustomerInfo.innerHTML = `
      <strong>নাম:</strong> ${customer.name || "-"}<br>
      <strong>মোবাইল:</strong> ${customer.phone || "-"}<br>
      <strong>জেলা:</strong> ${customer.district || "-"}<br>
      <strong>উপজেলা / থানা:</strong> ${customer.upazila || "-"}<br>
      <strong>ঠিকানা:</strong> ${customer.address || "-"}<br>
      <strong>পেমেন্ট:</strong> ${
        customer.payment === "COD" ? "ক্যাশ অন ডেলিভারি" : "অগ্রিম পেমেন্ট"
      }
    `;
  }

  if (pdfProducts) {
    pdfProducts.innerHTML = products
      .map(
        (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #cbd5e1;word-wrap:break-word;overflow-wrap:anywhere;">
            ${item.name}
          </td>

          <td style="padding:8px;border:1px solid #cbd5e1;text-align:center;">
            ${item.quantity}
          </td>

          <td style="padding:8px;border:1px solid #cbd5e1;text-align:right;word-wrap:break-word;">
            ${money(item.price)}
          </td>

          <td style="padding:8px;border:1px solid #cbd5e1;text-align:right;word-wrap:break-word;">
            ${money(item.price * item.quantity)}
          </td>
        </tr>
      `,
      )
      .join("");
  }

  if (pdfTotal) {
    pdfTotal.innerHTML = `
      <p>পণ্যের মোট মূল্য: ${money(order.subtotal)}</p>
      <p>ডেলিভারি চার্জ: ${money(order.delivery)}</p>
      <h2 style="font-size:24px;font-weight:bold;color:#172554;">
        সর্বমোট: ${money(order.total)}
      </h2>
    `;
  }

  // Store Current Order for PDF
  successModal.dataset.orderId = order.orderId;

  // Show Modal
  successModal.classList.remove("hidden");

  successModal.classList.add("flex");
}

// =================================
// HIDE SUCCESS MODAL
// =================================

export function hideSuccessModal() {
  const successModal = document.querySelector("#successModal");

  if (!successModal) return;

  successModal.classList.add("hidden");
  successModal.classList.remove("flex");
}

// =================================
// PDF DOWNLOAD
// =================================

async function downloadOrderPDF() {
  const pdfInvoice = document.querySelector("#pdfInvoice");
  const downloadButton = document.querySelector("#downloadOrderPDF");
  const successModal = document.querySelector("#successModal");

  if (!pdfInvoice || !downloadButton || !successModal) return;

  const orderId = successModal.dataset.orderId;

  if (!orderId) {
    alert("অর্ডার নম্বর পাওয়া যায়নি!");
    return;
  }

  const originalText = downloadButton.innerHTML;
  let pdfContainer = null;

  try {
    downloadButton.disabled = true;
    downloadButton.innerHTML = "PDF তৈরি হচ্ছে...";

    // Wait for Bengali fonts
    await document.fonts.ready;

    // Clone Invoice
    const invoiceClone = pdfInvoice.cloneNode(true);

    invoiceClone.removeAttribute("id");

    invoiceClone.style.width = "302px";
    invoiceClone.style.boxSizing = "border-box";
    invoiceClone.style.position = "static";
    invoiceClone.style.left = "auto";
    invoiceClone.style.top = "auto";
    invoiceClone.style.zIndex = "auto";
    invoiceClone.style.margin = "0";
    invoiceClone.style.display = "block";
    invoiceClone.style.visibility = "visible";
    invoiceClone.style.opacity = "1";
    invoiceClone.style.transform = "none";
    invoiceClone.style.background = "#ffffff";

    // Temporary container
    pdfContainer = document.createElement("div");

    pdfContainer.style.cssText = `
  position:fixed;
  left:-10000px;
  top:0;
  width:302px;
  margin:0;
  padding:0;
  background:#ffffff;
  z-index:-1;
  display:block;
  overflow:visible;
`;

    pdfContainer.appendChild(invoiceClone);
    document.body.appendChild(pdfContainer);

    // Wait for layout
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );

    // Invoice height calculate automatically
    const invoiceHeightPx = invoiceClone.scrollHeight;

    // Convert pixel to millimeter
    const invoiceHeightMm = (invoiceHeightPx * 25.4) / 96;

    // Add 4mm extra space
    const pdfHeight = Math.ceil(invoiceHeightMm + 4);

    const options = {
      margin: 2,

      filename: `MeritCare-Order-${orderId}.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: 400,
        logging: false,
      },

      jsPDF: {
        unit: "mm",
        format: [80, pdfHeight],
        orientation: "portrait",
        compress: true,
      },

      pagebreak: {
        mode: [],
      },
    };

    invoiceClone.style.position = "relative";
    invoiceClone.style.left = "0";
    invoiceClone.style.top = "0";

    // Generate compact invoice PDF
    await html2pdf().set(options).from(invoiceClone).save();
  } catch (error) {
    console.error("PDF Download Error:", error);

    alert("PDF ডাউনলোড করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
  } finally {
    pdfContainer?.remove();

    downloadButton.disabled = false;
    downloadButton.innerHTML = originalText;
  }
}

// =================================
// SUCCESS MODAL EVENTS
// =================================

export function setupSuccessEvents() {
  const newOrderButton = document.querySelector("#newOrderButton");
  const closeButton = document.querySelector("#closeSuccessModal");
  const downloadButton = document.querySelector("#downloadOrderPDF");

  // Order Success Event
  document.addEventListener("order:success", (event) => {
    const order = event.detail?.order;

    if (!order) {
      console.error("Order data not found!");
      return;
    }

    showSuccessModal(order);
  });

  // Continue Shopping
  newOrderButton?.addEventListener("click", () => {
    hideSuccessModal();
    window.location.hash = "products";
  });

  // Close Modal
  closeButton?.addEventListener("click", hideSuccessModal);

  // Download PDF
  downloadButton?.addEventListener("click", downloadOrderPDF);
}
