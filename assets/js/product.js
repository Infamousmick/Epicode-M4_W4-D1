const params = new URLSearchParams(window.location.search);
const query = params.get("q");
const url = `https://striveschool-api.herokuapp.com/api/product/${query}`;

let myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ1NTUzNmJhMGYxMjAwMTUyZTc3NmQiLCJpYXQiOjE3NzU1ODg2NjIsImV4cCI6MTc3Njc5ODI2Mn0.fmeLD3Mz5Mgg63Dp-R5seBcz2MnWrCdnRbRZyz4YUi8";

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
  console.log(data);
  const card = createCards(data);
  injectCards(card);
  togglePreferite();
  toggleCartList();
};

search();

const createCards = (item) => {
  const { name, description, brand, imageUrl, price, _id } = item;
  return `

    <div class="swiper-slide">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
          <div class="position-absolute top-0 end-0 p-3 z-1">
            <button class="btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" style="width: 35px; height: 35px;">
              <i class="fa-regular fa-heart preferite"></i>
            </button>
          </div>
          <a href="./product.html?q=${_id}">
            <img src="${imageUrl}" class="card-img-top object-fit-cover" alt="${name}" style="height:350px">
          </a>
          <div class="card-body d-flex flex-column">
            <a href="./product.html?q=${_id}" class="text-decoration-none">
              <p class="text-muted small mb-1">${brand}</p>
              <h5 class="card-title fs-6 fw-bold text-black text-truncate">${name}</h5>
              <p class="card-text text-black text-truncate small">${description}</p>   
            </a> 
              <div class="mt-auto d-flex justify-content-between align-items-center pt-3">
                <span class="fs-5 fw-bold">${price}€</span>
                <button type="button" href="#" class="btn rounded-pill btn-sm px-3 addToCart d-flex align-items-center gap-2">
                  <i class="fa-solid fa-plus"></i>  
                  <p class="mb-0 d-none d-lg-block">Add to cart</p> 
                </button>
              </div>
            </div>
        </div>
    </div>`;
};

const injectCards = (card) => {
  const container = document.querySelector("main section#product div");
  container.innerHTML = card;
};

const togglePreferite = () => {
  const preferiteItem = document.querySelector(".preferite");

  preferiteItem.addEventListener("click", () => {
    preferiteItem.classList.toggle("added");
    preferiteItem.classList.toggle("fa-solid");
    preferiteItem.classList.toggle("fa-regular");
  });
};

const toggleCartList = () => {
  const addToCartList = document.querySelectorAll("button.addToCart");

  addToCartList.forEach((btn) => {
    btn.addEventListener("click", () => {
      let text = btn.querySelector("p");
      let icon = btn.querySelector("i");

      if (text.textContent.includes("Add to cart")) {
        text.textContent = "Added";
      } else {
        text.textContent = "Add to cart";
      }
      icon.classList.toggle("fa-plus");
      icon.classList.toggle("fa-check");
    });
  });
};
