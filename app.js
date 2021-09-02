
//Declear variable
const searchInput = document.getElementById("input-field");
const error = document.getElementById("error");
const spinner = document.getElementById("spinner");
const bookContainer = document.getElementById("book-container")
const SearchingFor = document.getElementById("searching-for")



// Search button event handler and fetch Data


const loadData = () => {

    const searchText = searchInput.value;

    // Error if the input field is empty
    if (searchText === '') {
        error.innerText = "Search field can not be empty"
        bookContainer.textContent = '';
        return;

    }

    //Spinner start
    spinner.classList.remove("d-none");
    SearchingFor.innerText = `Searhing for: ${searchText}`;


    // clear input text
    searchInput.value = '';

    // Fetch Data

    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => diplayData(data.docs))

    // Clear error while data fetching
    error.innerText = '';
    // clear div for new search
    bookContainer.textContent = '';
}



// Display data in bootstrap card

const diplayData = books => {

    //Spinner end
    spinner.classList.add("d-none");

    //Show number of result

    if (books.length === 0) {
        error.innerText = "No result found"
        return;

    }

    else {
        error.innerText = `Total ${books?.length} result found`

    }


    books?.forEach(book => {

        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
        <div class="card h-100">

            <div class="w-100 h-100">
            
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="card-img-top" alt="...">

            </div>
            
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"><span>by </span><a href="https://openlibrary.org/authors/${book.author_key[0]}" target="_blank">${book.author_name[0] ? book.author_name[0] : ''}</a></p>
                <p class="card-text">First Published: ${book.first_publish_year ? book.first_publish_year : ''}</p>
                <p class="card-text">Language: ${book.language ? book.language : ''}</p>
                <p class="card-text">Publisher: ${book.publisher[0] ? book.publisher[0] : ''} </p>
            </div>
        </div>
        `
        bookContainer.appendChild(div);


    })


}