const appId = 'a7a498f3';  // Replace with your Edamam app ID
const appKey = '35dc822dedf98ec5f5e9a06c34a1f39f';  // Replace with your Edamam API key

async function searchRecipes() {
    const query = document.getElementById('recipeSearch').value;
    if (!query) {
        alert('Please enter an ingredient or recipe name');
        return;
    }

    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    if (recipes.length === 0) {
        recipeContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');

        recipeItem.innerHTML = `
            <h3>${recipe.label}</h3>
            <img src="${recipe.image}" alt="${recipe.label}">
            <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
            <p><strong>Ingredients:</strong></p>
            <ol class="ingredients">
                ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ol>
        `;

        recipeContainer.appendChild(recipeItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('recipeSearch').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    });
});
