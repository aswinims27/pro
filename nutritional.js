const appId = '84744c21';  // Replace with your Edamam app ID
const appKey = '27d256d087b85eaa17b18164937523bb';  // Replace with your Edamam API key

async function analyzeRecipe() {
    const recipeInput = document.getElementById('recipeInput').value;
    if (!recipeInput) {
        alert('Please enter a recipe');
        return;
    }

    const url = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingr: recipeInput.split('\n') })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayAnalysis(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayAnalysis(data) {
    const analysisContainer = document.getElementById('analysisContainer');
    analysisContainer.innerHTML = '';

    const analysisItem = document.createElement('div');
    analysisItem.classList.add('analysis-item');

    analysisItem.innerHTML = `
        <h3>Nutritional Analysis</h3>
        <p><strong>Calories:</strong> ${Math.round(data.calories)}</p>
        <p><strong>Total Weight:</strong> ${Math.round(data.totalWeight)} g</p>
        <p><strong>Diet Labels:</strong> ${data.dietLabels.join(', ')}</p>
        <p><strong>Health Labels:</strong> ${data.healthLabels.join(', ')}</p>
        <h4>Nutrients:</h4>
        <ol>
            ${Object.keys(data.totalNutrients).map(nutrient => `
                <li><strong>${data.totalNutrients[nutrient].label}:</strong> ${Math.round(data.totalNutrients[nutrient].quantity)} ${data.totalNutrients[nutrient].unit}</li>
            `).join('')}
        </ol>
    `;

    analysisContainer.appendChild(analysisItem);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('recipeInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            analyzeRecipe();
        }
    });
});
