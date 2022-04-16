
const getAllResults = () => {
  const charactersResults = [...document.querySelectorAll('.single-character')];
  return charactersResults;
}



const filteringSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const {name, character, house} = Object.fromEntries(formData);
  const filteringResults = getAllResults();

  console.log(filteringResults);
}

const form = document.querySelector('#form');
form.addEventListener('submit', filteringSubmit);