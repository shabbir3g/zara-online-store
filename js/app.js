// Load Product API
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// Load Single product API
const productDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => productModal(data));
}

// Close Modal Function
const closeModal = () =>{
  const modalBox = document.getElementById('modal-box');
  modalBox.textContent = "";
}

// Single product preview in modal
const productModal = (product) => {
  const modalBox = document.getElementById('modal-box');
  const div = document.createElement('div');
  div.classList.add('modal-content');
  div.innerHTML = ` 
  <div class="modal-header">
      <h5 class="modal-title" id="staticBackdropLabel">${product.title}</h5>
      <button onclick="closeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <img src="${product.image}" class="card-img-top img-fluid product-image" alt="...">
    <p>Category: ${product.category}</p>
    <h5>Price: $ ${product.price}</h5>
    <div class="product-rating"> 
    <ul class="rating">
    <li><i class="fas fa-star"></i></li>
    </ul>
    <b>${product.rating.rate} (${product.rating.count})</b>
  </div>
  <p>${product.description}</p>
  </div>
  <div class="d-flex m-2 justify-content-between"> 
  <button onclick="closeModal()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
  <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-success">add to cart</button>
  </div>`;
  modalBox.appendChild(div);
 
}



// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = ` 
        <div class="card h-100 shadow py-3">
        <img src="${image}" class="card-img-top img-fluid product-image" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
              <p>Category: ${product.category}</p>
              <h5>Price: $ ${product.price}</h5>
              <div class="product-rating"> 
                <ul class="rating">
                <li><i class="fas fa-star"></i></li>
                </ul>
                <b>${product.rating.rate} (${product.rating.count})</b>
              </div>
        </div>
        <div class="d-flex m-2 justify-content-between"> 
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-success">add to cart</button>
          <button onclick="productDetails(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="details-btn" class="btn btn-outline-danger">Details</button>
        </div>
      </div> `;

    
     
    document.getElementById("all-products").appendChild(div);
  }


};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;

  updateTotal();
};

// Get Input value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {

  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
    
  document.getElementById("total").innerText = grandTotal.toFixed(2);
  
};
