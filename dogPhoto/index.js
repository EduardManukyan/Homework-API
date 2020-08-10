const dogContainer = document.querySelector("#dog-container");
const sectionDog = document.querySelector("#section-dog");
const imagesContiner = document.querySelector("#images-container");

const dogsNames = [
  {
    label: "Akita",
    value: "akita",
  },
  {
    label: "Beagle",
    value: "beagle",
  },
  {
    label: "Dalmatian",
    value: "dalmatian",
  },
  {
    label: "German Shepherd",
    value: "germanshepherd",
  },
  {
    label: "Husky",
    value: "husky",
  },
  {
    label: "Labrador",
    value: "labrador",
  },
  {
    label: "Pug",
    value: "pug",
  },
  {
    label: "Golden Retriever",
    value: "retriever/golden",
  },
  {
    label: "Cocker Spaniel",
    value: "spaniel/cocker",
  },
];

function optionGenerating() {
  dogsNames.forEach((item) => {
    addOptions(item);
  });
}

function addOptions({ value, label }) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = label;
  sectionDog.append(option);
}

function getDogDataName(name) {
  fetch(`https://dog.ceo/api/breed/${name}/images`)
    .then((res) => res.json())
    .then((images) => {
      imagesContiner.innerHTML = "";
      images.message.forEach((link) => {
        const img = document.createElement("img");
        img.className = "imgstyle";
        img.src = link;
        imagesContiner.appendChild(img);
      });
    });
}

function initApp() {
  optionGenerating();
  sectionDog.addEventListener("change", (e) => {
    console.log(e.target.value);
    getDogDataName(e.target.value);
  });
}

initApp();
