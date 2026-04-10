const params = new URLSearchParams(window.location.search);
const query = params.get("q");
const url = `https://striveschool-api.herokuapp.com/api/product/${query}`;

let myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ1NTUzNmJhMGYxMjAwMTUyZTc3NmQiLCJpYXQiOjE3NzU1ODg2NjIsImV4cCI6MTc3Njc5ODI2Mn0.fmeLD3Mz5Mgg63Dp-R5seBcz2MnWrCdnRbRZyz4YUi8";

const showSpinner = (state) => {
  const spinner = document.querySelector("main #product .spinner");
  state ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
};

showSpinner(true);
const getData = async () => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nella richiesta HTTP");
    }
    return await response.json();
  } catch (err) {
    console.warn(err);
  }
};

const search = async () => {
  const data = await getData();

  setTimeout(() => {
    const card = createCards(data);
    injectCards(card);
    togglePreferite();
    toggleCart();
    showSpinner(false);
  }, 2000);
};

search();

const createCards = (item) => {
  const { name, description, brand, imageUrl, price, _id } = item;
  return `
 <div class="row align-items-center py-5">
      
      <div class="col-12 col-lg-6 text-center mb-5 mb-lg-0">
        <div class="bg-light rounded-5 p-5 d-flex justify-content-center align-items-center mx-auto" style="min-height: 500px; max-width: 90%;">
          <img src="${imageUrl}" class="img-fluid object-fit-contain" alt="${name}" style="max-height: 400px; mix-blend-mode: multiply;">
        </div>
      </div>
      <div class="col-12 col-lg-6 px-4 px-lg-5 text-start">
        <p class="text-danger fw-bold mb-2 text-uppercase fs-6" style="letter-spacing: 2px;">${brand}</p>     
        <h1 class="display-5 fw-bold mb-3 text-dark" style="line-height: 1.2;">${name}</h1> 
        <h2 class="display-6 fw-bolder text-dark mb-4">${price}<span class="fs-3 fw-medium text-muted">€</span></h2> 
        <p class="text-secondary mb-5 fs-5" style="line-height: 1.8;">${description}</p> 
        <div class="d-flex flex-column flex-sm-row gap-3">
          <button type="button" class="btn btn-success rounded-pill px-5 py-3 addToCart d-flex align-items-center justify-content-center gap-2 fw-bold fs-6 shadow-sm">
            <i class="fa-solid fa-plus"></i>  
            <span>Add to cart</span> 
          </button>
          
          <button type="button" class="btn btn-light border rounded-pill px-4 py-3 preferite d-flex align-items-center justify-content-center gap-2 fw-bold fs-6">
            <i class="fa-regular fa-heart"></i>
            <span>ADD TO WISHLIST</span>
          </button>
        </div>

      </div>
    </div>
  `;
};

const injectCards = (card) => {
  const container = document.querySelector(
    "main section#product #productContainer",
  );
  container.innerHTML = card;
};

const togglePreferite = () => {
  const preferiteBtn = document.querySelector("button.preferite");

  preferiteBtn.addEventListener("click", () => {
    const icon = preferiteBtn.querySelector("i");
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("text-danger");
  });
};

const toggleCart = () => {
  const addToCartBtn = document.querySelectorAll("button.addToCart");

  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let text = btn.querySelector("span");
      let icon = btn.querySelector("i");
      text.textContent = text.textContent.includes("Add to cart")
        ? "Added"
        : "Add to cart";
      icon.classList.toggle("fa-plus");
      icon.classList.toggle("fa-check");
    });
  });
};
