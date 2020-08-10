const searchInput = document.getElementById("search-input");
const submitButton = document.getElementById("submit-button");
const boxContainer = document.querySelector(".box-container");
const paginationContainer = document.querySelector(".pagination-container");
const boxContent = document.createElement("div");
const totalCountP = document.createElement("p");

function handleButtonClick(page) {
  boxContent.innerHTML = "";
  let value = valueToUrl(searchInput.value);
  fetch(
    `http://openlibrary.org/search.json?q=${value}&page=${page ? page : "1"}`
  )
    .then((response) => response.json())
    .then(createBoxContent);
}

function valueToUrl(value) {
  let resultValue = value.toLowerCase();
  const arr = resultValue.split(" ");
  resultValue = arr.join("+");
  return resultValue;
}

function createLi(text) {
  const li = document.createElement("li");
  li.innerHTML = text;

  return li;
}

function createLiWithNestedUl(array) {
  const li = document.createElement("li");
  let ul = document.createElement("ul");
  const span = document.createElement("span");
  span.innerHTML = "Subject :";

  if (array) {
    array.forEach((sub, i) => {
      if (i < 5 && sub) {
        const subLi = document.createElement("li");
        subLi.innerHTML = sub;
        ul.append(subLi);
      }
    });
    li.appendChild(span);
    li.appendChild(ul);
  } else {
    span.innerHTML = span.innerHTML + " there is no Subject";
    li.appendChild(span);
  }

  return li;
}

function createBoxContent({ numFound, docs }) {
  totalCountP.innerHTML = `Total Count: ${numFound}`;
  createPagination(numFound);

  docs.forEach(({ title_suggest, author_name, publish_year, subject }) => {
    const newUl = document.createElement("ul");

    newUl.append(createLi(`Title: ${title_suggest}`));
    newUl.append(createLi(`Author Name : ${author_name}`));
    newUl.append(
      createLi(
        `First Publish Year: ${
          publish_year ? publish_year[0] : "Not published Yet"
        }.`
      )
    );
    newUl.append(createLiWithNestedUl(subject));

    boxContent.append(newUl);
  });
}

function createPagination(numb) {
  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(numb / 100);
  for (let i = 0; i < pageCount; i++) {
    const p = document.createElement("p");

    p.addEventListener("click", () => handleButtonClick(i + 1));
    p.innerHTML = ` ${i + 1}`;
    paginationContainer.appendChild(p);
  }
}

function initApp() {
  submitButton.addEventListener("click", handleButtonClick);
  boxContent.className = "box-content";
  boxContainer.appendChild(totalCountP);
  boxContainer.appendChild(boxContent);
  totalCountP.id = "mySpan";

  totalCountP.innerHTML = `Total count : 0`;
}

initApp();
