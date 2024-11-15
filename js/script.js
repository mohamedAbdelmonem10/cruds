var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdata = document.getElementById("btnUpdata");
var currentIndex = 0;

// create product
var productList = [];

if (localStorage.getItem("productContainer") !== null) {
  // save data while i do refresh step 2
  productList = JSON.parse(localStorage.getItem("productContainer"));
  displayData();
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]
      ? `images/${productImageInput.files[0]?.name}`
      : "images/p-4.jpg",
  };
  // array of object
  productList.push(product);
  // save data while i do refresh step 1
  localStorage.setItem("productContainer", JSON.stringify(productList));

  displayData();

  clearForm();
}

// clear inputs
function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

// display data
function displayData() {
  var carton = "";

  for (i = 0; i < productList.length; i++) {
    carton += `
                <div class="col">
                    <div class="card">
                        <img class="card-img-top" src="${productList[i].image}" alt="${productList[i].name}">
                        <div class="card-body">
                            <span class="badge bg-info">Index: ${i}</span>
                            <h3 class="card-title h6">productName: ${productList[i].name}</h3>
                            <div class="d-flex flex-column gap-2">
                                <span class="card-text small">productPrice : ${productList[i].price}</span>
                                <span class="card-text small">productCategory : ${productList[i].category}</span>
                                <span class="card-text small">productDescription : ${productList[i].description}</span>
                            </div>
                        </div>
                        <div class="card-footer text-center d-flex gap-2 justify-content-center">                      
                            <button onclick="deleteItem(${i})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                            <button onclick="setUpdateInfo(${i})" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
                        </div>
                    </div>
                </div>
    `;
  }

  document.getElementById("rowData").innerHTML = carton;
}

// delete items  zay str 25 => 29
function deleteItem(index) {
  // => str 63
  productList.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
}

// search
function searchName() {
  var term = searchInput.value;

  var carton = "";

  for (i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      carton += `
      <div class="col">
          <div class="card">
              <img class="card-img-top" src="${productList[i].image}" alt="${productList[i].name}">
              <div class="card-body">
                  <span class="badge bg-info">Index: ${i}</span>
                  <h3 class="card-title h6">productName: ${productList[i].name}</h3>
                  <div class="d-flex flex-column gap-2">
                      <span class="card-text small">productPrice : ${productList[i].price}</span>
                      <span class="card-text small">productCategory : ${productList[i].category}</span>
                      <span class="card-text small">productDescription : ${productList[i].description}</span>
                  </div>
              </div>
              <div class="card-footer text-center d-flex gap-2 justify-content-center">                      
                  <button onclick="deleteItem(${i})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                  <button class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
              </div>
          </div>
      </div>
`;
    }
  }

  document.getElementById("rowData").innerHTML = carton;
}
// Update
function setUpdateInfo(index) {
  currentIndex = index;

  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;

  scroll({
    top: 0,
    behavior: "smooth",
  });

  btnAdd.classList.add("d-none");
  btnUpdata.classList.remove("d-none");
}
// Update
function updateData() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]
      ? `images/${productImageInput.files[0]?.name}`
      : "images/p-4.jpg",
  };

  productList.splice(currentIndex, 1, product);
  displayData();

  localStorage.setItem("productContainer", JSON.stringify(productList));

  btnAdd.classList.remove("d-none");
  btnUpdata.classList.add("d-none");

  clearForm();
}
