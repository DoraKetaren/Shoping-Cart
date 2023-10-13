// Memilih semua tombol "Add to Cart" dan menyimpannya dalam productButtons
const productButtons = document.querySelectorAll(".add-to-cart");

// Mendapatkan elemen cart, subtotal, total akhir, input promo code, dan tampilan diskon
const cart = document.getElementById("cart");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartFinalTotal = document.getElementById("cart-final-total");
const promoCodeInput = document.getElementById("promo-code");
const discountDisplay = document.getElementById("discount");

// Mendefinisikan array untuk menyimpan item-item dalam keranjang
let cartItems = [];

// Menyimpan total harga dari keranjang
let cartTotal = 0;

// Daftar promo code dan diskon yang sesuai
const promoCodes = {
  DISC10: 0.1,
  DISC50: 0.5,
  DISC75: 0.75,
};

// Menambahkan event listener untuk setiap tombol "Add to Cart"
productButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Menambahkan event listener untuk input promo code
promoCodeInput.addEventListener("input", applyPromoCode);

function addToCart(event) {
  const button = event.target;
  const productName = button.getAttribute("data-name");
  const productPrice = parseFloat(button.getAttribute("data-price"));

  // Menambahkan item ke dalam keranjang
  cartItems.push({ name: productName, price: productPrice });

  // Menghitung total harga keranjang
  cartTotal += productPrice;

  // Memperbarui tampilan keranjang
  displayCart();
}

function displayCart() {
  // Mengosongkan tampilan keranjang
  cart.innerHTML = "";

  // Menampilkan setiap item dalam keranjang
  cartItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerText = `${item.name}: Rp. ${item.price}`;
    cart.appendChild(itemDiv);
  });

  // Memperbarui subtotal dan total akhir
  cartSubtotal.innerText = `Sub Total: Rp. ${cartTotal}`;
  cartFinalTotal.innerText = `Total: Rp. ${cartTotal}`;
}

function clearCart() {
  // Mengosongkan array cartItems
  cartItems.length = 0;

  // Mengosongkan tampilan keranjang
  cart.innerHTML = "";

  // Mengosongkan total harga, diskon, dan total akhir
  cartTotal = 0;
  cartSubtotal.innerText = "Sub Total: Rp. 0";
  cartFinalTotal.innerText = "Total: Rp. 0";
  discountDisplay.innerText = "-";
}

function applyPromoCode() {
  const promoCode = promoCodeInput.value.toUpperCase();

  if (promoCodes[promoCode]) {
    const discountPercentage = promoCodes[promoCode];
    const discountAmount = cartTotal * discountPercentage;
    const discountedTotal = cartTotal - discountAmount;

    discountDisplay.innerText = `Discount: Rp. ${discountAmount}`;
    cartFinalTotal.innerText = `Total (after discount): Rp. ${discountedTotal}`;
  } else {
    discountDisplay.innerText = "-";
  }
}
