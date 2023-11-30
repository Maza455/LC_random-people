let searchInput = document.getElementById('search');
let sortButton = document.getElementById('sort');
let pplDiv = document.getElementById('people');

let people = [];


fetch('https://randomuser.me/api?results=20')
  .then(response => response.json())
//   .then(data => {
//     people = data.results.slice(0, 20);
//     displayPeople(people);
//   })
  .catch(error => console.error(error));


function displayPeople(people) {
  pplDiv.innerHTML = '';
  if (people.length === 0) {
    pplDiv.textContent = 'Name not found.';
  } else {
    people.forEach(person => {
      const prsnDiv = document.createElement('div');
      prsnDiv.classList.add('person');
      prsnDiv.innerHTML = `
        <img src="${person.picture.large}">
        <p>${person.name.first} ${person.name.last}</p>
      `;
      pplDiv.appendChild(prsnDiv);
    });
  }
}

// Filter the people array by the given search term and display the results
function searchPeople(searchTerm) {
  const filteredPeople = people.filter(person => {
    return person.name.first.toLowerCase().includes(searchTerm.toLowerCase());
  });
  displayPeople(filteredPeople);
}

// Sort the people array by first name in ascending or descending order
function sortPeople(ascending) {
  people.sort((a, b) => {
    if (a.name.first < b.name.first) {
      return ascending ? -1 : 1;
    } else if (a.name.first > b.name.first) {
      return ascending ? 1 : -1;
    } else {
      return 0;
    }
  });
  displayPeople(people);
}

// Event listeners
searchInput.addEventListener('input', event => {
  const searchTerm = event.target.value.trim();
  if (searchTerm === '') {
    displayPeople(people);
  } else {
    searchPeople(searchTerm);
  }
});

sortButton.addEventListener('click', () => {
  sortPeople(sortButton.textContent === 'Sort A-Z');
  sortButton.textContent = sortButton.textContent === 'Sort A-Z' ? 'Sort Z-A' : 'Sort A-Z';
});
