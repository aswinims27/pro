document.addEventListener('DOMContentLoaded', function () {
    // Initialize any necessary data or event listeners.
});

const recipes = [
    {
        condition: "Diabetes",
        recipes: [
            {
                name: "Quinoa and Vegetable Stir-Fry",
                ingredients: "Quinoa, Vegetables, Olive oil, Soy sauce, Sesame oil",
                instructions: "Cook quinoa, sauté vegetables, mix with quinoa and sauces."
            },
            {
                name: "Chickpea and Avocado Salad",
                ingredients: "Chickpeas, Avocado, Cucumber, Bell pepper, Olive oil",
                instructions: "Mix all ingredients, drizzle with olive oil and lemon juice."
            }
        ]
    },
    {
        condition: "Hypertension",
        recipes: [
            {
                name: "Lentil and Spinach Soup",
                ingredients: "Lentils, Spinach, Carrots, Celery, Vegetable broth",
                instructions: "Cook lentils with vegetables and broth, add spinach at the end."
            }
        ]
    },
    {
        condition: "Low Hemoglobin",
        recipes: [
            {
                name: "Spinach and Beet Salad",
                ingredients: "Spinach, Beets, Walnuts, Feta cheese, Olive oil",
                instructions: "Roast beets, mix with spinach, walnuts, feta, and olive oil."
            }
        ]
    },
    {
        condition: "Gut Health",
        recipes: [
            {
                name: "Yogurt and Berry Parfait",
                ingredients: "Greek yogurt, Berries, Granola, Honey",
                instructions: "Layer yogurt, berries, granola, and honey in a glass."
            }
        ]
    }
];

function addPatientData() {
    const patientName = document.getElementById('patientName').value;
    const patientAge = document.getElementById('patientAge').value;
    const healthCondition = document.getElementById('healthCondition').value.toLowerCase();
    const bloodPressure = document.getElementById('bloodPressure').value;
    const sugarLevel = document.getElementById('sugarLevel').value;
    const dnaReport = document.getElementById('dnaReport').value;
    const gutMicrobiomes = document.getElementById('gutMicrobiomes').value;
    const hemoglobinLevel = document.getElementById('hemoglobinLevel').value;

    if (!patientName || !patientAge || !healthCondition) {
        alert("Please fill out all fields");
        return;
    }

    const patientData = {
        name: patientName,
        age: patientAge,
        condition: healthCondition,
        bloodPressure,
        sugarLevel,
        dnaReport,
        gutMicrobiomes,
        hemoglobinLevel
    };

    console.log(patientData); // You can save this data to a database or use it as needed.

    displayRecipes(healthCondition, hemoglobinLevel, gutMicrobiomes, bloodPressure, sugarLevel);
}

function displayRecipes(condition, hemoglobinLevel, gutMicrobiomes, bloodPressure, sugarLevel) {
    const recipeSuggestions = document.getElementById('recipeSuggestions');
    recipeSuggestions.innerHTML = '<h2>Suggested Recipes</h2>';

    const matchedRecipes = recipes.find(recipe => recipe.condition.toLowerCase() === condition);

    if (matchedRecipes) {
        matchedRecipes.recipes.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');

            recipeItem.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;

            recipeSuggestions.appendChild(recipeItem);
        });
    } else {
        recipeSuggestions.innerHTML += '<p>No recipes available for this health condition.</p>';
    }

    if (hemoglobinLevel < 13.5) {
        addAdditionalRecipes("Low Hemoglobin");
    }

    if (gutMicrobiomes) {
        addAdditionalRecipes("Gut Health");
    }

    if (bloodPressure === "high") {
        addAdditionalRecipes("Hypertension");
    }

    if (sugarLevel === "high") {
        addAdditionalRecipes("Diabetes");
    }
}

function addAdditionalRecipes(condition) {
    const matchedRecipes = recipes.find(recipe => recipe.condition.toLowerCase() === condition.toLowerCase());
    const recipeSuggestions = document.getElementById('recipeSuggestions');

    if (matchedRecipes) {
        matchedRecipes.recipes.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');

            recipeItem.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;

            recipeSuggestions.appendChild(recipeItem);
        });
    }
}

function showNurseLogin() {
    document.getElementById('nurseLogin').style.display = 'block';
    document.getElementById('userLogin').style.display = 'none';
}

function checkAccess() {
    const username = document.getElementById('nurseUsername').value;
    const password = document.getElementById('nursePassword').value; // This should be securely managed in a real application

    if (username === 'nurse1' && password === 'password123') {
        
        // Redirect to health report page
        window.location.href = 'report.html';
    } else {
        alert('Invalid nurse credentials');
    }
}
