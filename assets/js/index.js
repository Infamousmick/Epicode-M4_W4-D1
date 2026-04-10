const url = "https://striveschool-api.herokuapp.com/api/product/";
let myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ1NTUzNmJhMGYxMjAwMTUyZTc3NmQiLCJpYXQiOjE3NzU1ODg2NjIsImV4cCI6MTc3Njc5ODI2Mn0.fmeLD3Mz5Mgg63Dp-R5seBcz2MnWrCdnRbRZyz4YUi8";

const showSpinner = (state) => {
  const spinner = document.querySelector("main #products .spinner");
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
    const cards = createCards(data);
    injectCards(cards);
    initSwiper();
    togglePreferite();
    toggleCartList();

    showSpinner(false);
  }, 2000);
};

search();

const initSwiper = () => {
  // init Swiper:
  const swiper = new Swiper(".swiper", {
    slidesPerView: 2,
    spaceBetween: 15,
    allowTouchMove: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
        allowTouchMove: true,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 25,
        allowTouchMove: false,
      },
    },
  });
};
const createCards = (items) => {
  return items.reduce((acc, curr, index) => {
    const { name, description, brand, imageUrl, price, _id } = curr;
    acc += `
    <!-- Slides -->
    <div class="swiper-slide p-2">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
          <div class="position-absolute top-0 end-0 p-3 z-1">
            <button class="btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" style="width: 35px; height: 35px;">
              <i class="fa-regular fa-heart preferite"></i>
            </button>
          </div>
          <a href="./product.html?q=${_id}">
            <img src="${imageUrl}" class="card-img-top object-fit-cover" alt="${name}" style="height:250px">
          </a>
          <div class="card-body d-flex flex-column">
            <a href="./product.html?q=${_id}" class="text-decoration-none">
              <p class="text-muted small mb-1">${brand}</p>
              <h5 class="card-title fs-6 fw-bold text-black text-truncate">${name}</h5>
              <p class="card-text text-black text-truncate small">${description}</p>   
            </a> 
              <div class="mt-auto d-flex justify-content-between align-items-center pt-3">
                <span class="fs-5 fw-bold">${price}€</span>
                <button type="button" class="btn rounded-pill btn-sm px-3 addToCart d-flex align-items-center gap-2">
                  <i class="fa-solid fa-plus"></i>  
                  <p class="mb-0 d-none d-lg-block">Add to cart</p> 
                </button>
              </div>
            </div>
        </div>
    </div>`;
    return acc;
  }, "");
};

const injectCards = (cards) => {
  const container = document.querySelector("main .swiper .swiper-wrapper");
  container.innerHTML = cards;
};

const togglePreferite = () => {
  const preferiteList = document.querySelectorAll(".preferite");

  preferiteList.forEach((preferite) => {
    preferite.addEventListener("click", () => {
      preferite.classList.toggle("added");
      preferite.classList.toggle("fa-solid");
      preferite.classList.toggle("fa-regular");
    });
  });
};

const toggleCartList = () => {
  const addToCartList = document.querySelectorAll("button.addToCart");

  addToCartList.forEach((btn) => {
    btn.addEventListener("click", () => {
      let text = btn.querySelector("p");
      let icon = btn.querySelector("i");
      text.textContent = text.textContent.includes("Add to cart")
        ? "Added"
        : "Add to cart";
      icon.classList.toggle("fa-plus");
      icon.classList.toggle("fa-check");
    });
  });
};
