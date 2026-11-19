const userContentInput = document.querySelector("#userContentInput");
const home = document.querySelector("#home");
const submit = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");

const arr = JSON.parse(localStorage.getItem("arr")) || [];
if (arr.length > 0) {
  display()

}
searchInput.addEventListener('input', () => {
  search(searchInput.value);
})
submit.addEventListener("submit", (e) => {
  e.preventDefault();
  let content = userContentInput.value.trim();
  if (!content) return;
  arr.push(content);
  localStorage.setItem("arr", JSON.stringify(arr))
  submit.reset();
  display()
});

function display() {
  home.innerHTML = '';
  arr.forEach((content, i) => {
    home.innerHTML += `<div id="homeContent"
      class="home-item mb-2 rounded-pill text-dark mx-auto w-50 bg-danger d-flex justify-content-between align-items-center">
      <p id="itemContent" class="m-0 p-0">Content: ${content}</p>
      <i class="fa-sharp fa-solid fa-trash" onclick="deleteContent(${i})"></i>
    </div>
`;
  })
}
function search(valueSearch) {
  home.innerHTML = '';
  arr.forEach((content, i) => {
    if (!content.toLowerCase().includes(valueSearch.toLowerCase())) return;
    let HighlightChar = content.replaceAll(valueSearch, `<span class="bg-warning">${valueSearch}</span>`)
    home.innerHTML += `<div id="homeContent"
      class="home-item mb-2 rounded-pill text-dark mx-auto w-50 bg-danger d-flex justify-content-between align-items-center">
      <p id="itemContent" class="m-0 p-0">Content: ${HighlightChar}</p>
      <i class="fa-sharp fa-solid fa-trash" onclick="deleteContent(${i})"></i>
    </div>
`;

  })
}
const deleteContent = (i) => {
  arr.splice(i, 1);
  localStorage.setItem("arr", JSON.stringify(arr))
  display();
}