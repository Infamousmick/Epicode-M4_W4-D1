// ESERCIZI - Pag. 1:
// · Il tuo obiettivo è di creare un finto e-commerce con le funzionalità di gestione dei
// prodotti. Non sara' prevista alcuna funzionalita' di pagamento.

// · Le features da implementare sono:
// o Una frontpage, dove si vedono tutti i prodotti
// A back office da cui aggiungere nuovi prodotti e modificare quelli gia' esistenti
// o Una pagina prodotto

// . Nel backoffice, implementa un form per aggiungere un nuovo prodotto al database. Il
// prodotto deve essere strutturato come nella prossima slide

// · Cliccando su un prodotto, l'utente deve essere reindirizzato ad una pagina prodotto.
// Passa l'id come query string nell'URL.

// ESERCIZI - Pag. 2:
// Nella pagina prodotto, mostra le informazioni del prodotto su cui si e cliccato. Puoi
// prendere le informazioni dall'endpoint "product/IL TUO ID QUI"

// · Nel backoffice, aggiungi la funzionalità per modificare un prodotto e un pulsante per
// eliminarlo.

// {
// " id": "5d318e1a8541744830bef139", // GENERATO DAL SERVER

// "name": "3310 cellphone", // OBBLIGATORIO

// "description": "An unforgettable icon.", // OBBLIGATORIO

// "brand": "Nokia", // OBBLIGATORIO

// "imageUrl": "https://bit.ly/3CExjRa", // OBBLIGATORIO

// "price": 100, // OBBLIGATORIO

// "userId": "admin", // GENERATO DAL SERVER

// "createdAt": "2021-09-19T09:32:10.535Z", // GENERATO DAL SERVER

// "updatedAt": "2021-09-19T09:32:10.535Z", // GENERATO DAL SERVER

// __v": 0 // GENERATO DAL SERVER
// }

// . I campi che dicono "GENERATO DAL SERVER" non serve che siano inviati all'API.

// . L'endpoint e: https://striveschool-api.herokuapp.com/api/product/

// · Sia per GET che per POST.
// Per PUT e DELETE è necessario specificare l'id

// . https://striveschool-api.herokuapp.com/api/product/:ID QUI

// .

// ** IMPORTANTE **

// · OGNI CHIAMATA DEVE ESSERE AUTENTICATA.
// · Ogni richiesta a questo API deve includere un token per ottenere l'accesso.
// Puoi ottenere il token qui: https://strive.school/studentlogin

// Esempio:
// fetch('https://striveschool-api.herokuapp.com/api/product/', {
// headers: {
// Authorization: 'Bearer XXXXXXXXXXXXXXXXX'
//}
// })

// · Dove "XXXXXXXXXXXXXXXXX" deve essere sostituito dal token preso dalla pagina
// menzionata in precedenza.

// CENTRO RISOLUZIONE PROBLEMI / FAQ ::

// Imparare a leggere gli errori è fondamentale!
// . DOMANDA: Ricevo solo un array vuoto, perché ?**
// . RISPOSTA: L'API ti invierà solo i prodotti che TU hai aggiunti. Prova a creare qualcosa
// con POST e controlla di nuovo.

// . DOMANDA: Ricevo un errore 500, come posso risolvere ?**
// · RISPOSTA: Controlla nella network tab del tuo inspector per vedere l'errore specifico.
// · Solitamente:

// 1.   Ti manca un field nel corpo
// 2.   Hai una "duplicate key", cioè il nome del prodotto esiste già
// 3.   Hai inviato il tipo sbagliato di dati (una stringa invece di un numero o simili)

const url = "https://striveschool-api.herokuapp.com/api/product/";
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
const getsingleData = async (id) => {
  try {
    const response = await fetch(`${url}${id}`, {
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

const postData = async (product) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json; charset=UTF-8",
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

const updateData = async (product, id) => {
  try {
    const response = await fetch(`${url}${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json; charset=UTF-8",
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

const deleteData = async (id) => {
  try {
    const response = await fetch(`${url}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Errore nella richiesta HTTP");
    }
    return await response;
  } catch (err) {
    console.warn(err);
  }
};

const extractFormData = (formId) => {
  return {
    name: document.querySelector(`form#${formId} input#name`).value,
    description: document.querySelector(`form#${formId} input#description`)
      .value,
    brand: document.querySelector(`form#${formId} input#brand`).value,
    imageUrl: document.querySelector(`form#${formId} input#imageUrl`).value,
    price: parseFloat(
      document.querySelector(`form#${formId} input#price`).value,
    ),
  };
};

let currentEditId;
const formElement = document.getElementById("updateProduct");
const modalTitle = document.getElementById("updateItemLabel");
const submitBtn = document.querySelector("#mainSubmitBtn");

const closeModal = () => {
  const modalNode = document.getElementById("updateItem");
  const modalInstance = bootstrap.Modal.getInstance(modalNode);
  if (modalInstance) {
    modalInstance.hide();
  }
};

const addProductBtn = document.querySelector("button.addProduct");
addProductBtn.addEventListener("click", () => {
  currentEditId = null;
  formElement.reset();

  modalTitle.innerText = "Aggiungi Nuovo Prodotto";
  submitBtn.innerText = "Salva Prodotto";
  submitBtn.className = "btn btn-success";
});

const tableBody = document.querySelector("table.table tbody");
tableBody.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const targetId = btn.getAttribute("data-id");

  if (btn.classList.contains("edit-btn")) {
    currentEditId = targetId;
    modalTitle.innerText = "Modifica Elemento";
    submitBtn.innerText = "Salve modifiche";
    submitBtn.className = "btn btn-primary";

    const data = await getsingleData(currentEditId);
    updateModal(data, currentEditId);
  } else if (btn.classList.contains("delete-btn")) {
    deleteData(targetId).then(() => {
      search();
      showAlert("Elemento cancellato", "text-bg-danger");
    });
  }
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const productData = extractFormData("updateProduct");

  if (currentEditId) {
    updateData(productData, currentEditId).then(() => {
      search();
      closeModal();
      showAlert("Elemento modificato con successo", "text-bg-success");
    });
  } else {
    postData(productData).then(() => {
      search();
      closeModal();
      showAlert("Nuovo elemento aggiunto!", "text-bg-success");
    });
  }
});

const showAlert = (message, color) => {
  const alertContainer = document.querySelector(".toast-container");
  alertContainer.innerHTML = `
  <div id="liveToast" class="toast align-items-center ${color} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body fw-medium">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
`;

  const toastElement = document.getElementById("liveToast");

  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();
};

const updateModal = (data, id) => {
  const { name, description, brand, imageUrl, price } = data;

  const nameInput = document.querySelector("form#updateProduct input#name");
  nameInput.value = name;

  const descriptionInput = document.querySelector(
    "form#updateProduct input#description",
  );
  descriptionInput.value = description;

  const brandInput = document.querySelector("form#updateProduct input#brand");
  brandInput.value = brand;

  const imageInput = document.querySelector(
    "form#updateProduct input#imageUrl",
  );
  imageInput.value = imageUrl;

  const priceInput = document.querySelector("form#updateProduct input#price");
  priceInput.value = parseFloat(price);
};

const createTableRow = (products) => {
  tableBody.innerHTML = "";
  // Table content

  tableBody.innerHTML = products.reduce((acc, curr, index) => {
    const { name, description, brand, imageUrl, price, _id } = curr;
    acc += `

    <tr>
      <th scope="row">${index}</th>
      <td>${name}</td>
      <td>${description}</td>
      <td>${brand}</td>
      <td><a href="${imageUrl}">Image</a></td>
      <td>${price}</td>
      <td class="d-flex gap-2">
        <button class="btn btn-warning edit-btn"  data-bs-toggle="modal"
      data-bs-target="#updateItem" data-id="${_id}">Modifica</button>
        <button class="btn btn-danger delete-btn" data-id="${_id}">Elimina</button>  
      </td>
    </tr>
`;
    return acc;
  }, "");
};

const search = async () => {
  const data = await getData();
  createTableRow(data);
};

search();
