
// Search button event handler and fetch Data

const loadData = () => {

    const searchText = document.getElementById("input-field").value;


    // Error if the input field is empty

    const error = document.getElementById("error");
    if (searchText === '') {
        error.innerText = "Search field can not be empty"
        return;

    }


    // clear input text
    document.getElementById("input-field").value = '';

    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => diplayData(data.docs))


}

// Display data in bootstrap card

const diplayData = books => {

    const bookContainer = document.getElementById("book-container")
    // clear div after search
    bookContainer.textContent = '';

    //Show number of result

    if (books.length === 0) {
        document.getElementById("error").innerText = "No result found"
        return;

    }

    else {
        document.getElementById("error").innerText = `Total ${books?.length} result found`

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