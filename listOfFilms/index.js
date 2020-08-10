const filmsContainer = document.querySelector("#films-container");
const labels = [
  "Title:",
  "Description:",
  "Director:",
  "Producer:",
  "Release Date:",
];
function getData() {
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(
        ({ title, release_date, director, description, producer }) => {
          const box = createBox([
            title,
            description,
            director,
            producer,
            release_date,
          ]);
          filmsContainer.append(box);
        }
      );
    });
}
function createBox(values) {
  const div = document.createElement("div");
  div.className = "box-content";
  labels.forEach((label, i) => {
    const line = document.createElement("div");
    const name = document.createElement("span");
    const info = document.createElement("span");
    name.className = "label-text";
    line.className = "line-box";
    info.className = "info-text";
    name.innerHTML = label;
    info.innerHTML = values[i];
    line.appendChild(name);
    line.appendChild(info);
    div.appendChild(line);
  });
  return div;
}
function initApp() {
  getData();
}
initApp();
