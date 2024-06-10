document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const intolerance = document.getElementById('intolerance').value;
    getRecipes(intolerance);
});

function getRecipes(intolerance) {
    const apiKey = 'f298b46bddf24f739ba7873d50f46ecf';
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?intolerances=${intolerance}&number=10&apiKey=${apiKey}`;

    console.log('Fetching recipes for intolerance:', intolerance); // Log the intolerance

    fetch(apiUrl)
        .then(response => {
            console.log('API Response:', response); // Log the response object
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Data:', data); // Log the data received from the API
            if (data.results && data.results.length > 0) {
                displayRecipes(data.results);
            } else {
                displayNoResultsMessage(intolerance);
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            displayErrorMessage(error);
        });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeElement.appendChild(recipeImage);

        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = recipe.title;
        recipeElement.appendChild(recipeTitle);

        recipesContainer.appendChild(recipeElement);
    });
}

function displayNoResultsMessage(intolerance) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = `<p>No recipes found for intolerance: ${intolerance}</p>`;
}

function displayErrorMessage(error) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
}
