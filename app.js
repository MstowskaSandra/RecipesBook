
let recipesAPI ="https://dummyjson.com/recipes";
let recipes= [];

fetch(recipesAPI)
.then(response => response.json())
.then(data => {
    recipes = data.recipes;
})

let ratings = {};
function rateRecipe(recipeId, rating) {
    ratings[recipeId] = rating;
}

function displayRecipies(recipes) {
    const recipeContainer = document.querySelector('#recipeContainer');
    recipeContainer.innerHTML= '';

    if (recipes.length === 0) {
        recipeContainer.innerHTML =`<p> No recipes to display :('</p>`;
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML= `
        <img src= "${recipe.image}" alt= "${recipe.name}">
           <h2>${recipe.name}</h2>
           <h3><strong>Cook time: </strong>${recipe.cookTimeMinutes}min</h3>
           <p><strong>Incredients:</strong>${recipe.ingredients} <br><br>
           <strong>Instructions: </strong> ${recipe.instructions}</p>
           <div class="rating"  data-recipe-id="${recipe.id}"></div>
        `;
        recipeContainer.appendChild(recipeElement);

        console.log(recipe);
        recipeElement.addEventListener('click', () => showRecipeDetails(recipe));
    });      
}

function showRecipeDetails(recipe) {
    const recipeContainer = document.querySelector('#recipeContainer');
    recipeContainer.innerHTML = `
       <h2>${recipe.name}</h2>
       <img src="${recipe.image}" alt="${recipe.name}">
       <h3><strong>Cook time:</strong> ${recipe.cookTimeMinutes} min</h3>
       <p><strong>Ingredients:</strong> ${recipe.ingredients}  <br><br>
       <strong>Instructions: </strong> ${recipe.instructions}</p>
       <div class="rating"  data-recipe-id="${recipe.id}"></div>
    `;

    const storedRating = ratings[recipe.id] || 0;
    displayRating(recipe.id, storedRating);

    const backButton = document.querySelector('#backButton');
    backButton.style.display = 'block';
    backButton.onclick = backToStart;
   
    document.querySelector('#searchButton').style.display = 'none';
}

function displayRating(recipeId, rating) {
    const ratingContainer = document.querySelector(`.rating[data-recipe-id= "${recipeId}"]`);
    ratingContainer.innerHTML = '';

    Array.from({length: 5}).forEach((_, index) => {
        const star = document.createElement('span');
        star.classList.add('star');
        star.innerHTML = '★';
        star.dataset.value =  index + 1;

        star.addEventListener('click', ()  => {
            rateRecipe(recipeId, star.dataset.value);
            displayRating(recipeId, star.dataset.value); 
    });

    ratingContainer.appendChild(star);
});

const stars = ratingContainer.querySelectorAll('.star');
stars.forEach((star, index) => {
    star.classList.toggle('selected', index < rating);
});
}

document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('#backButton');
    console.log(backButton);
    backButton.onclick = backToStart;
});

function backToStart() {
    const recipeContainer = document.querySelector('#recipeContainer');
    recipeContainer.innerHTML = '';
    
    const searchContainer= document.querySelector('#container');
    container.style.display = 'block';

    document.querySelector('#searchButton').style.display = 'block';

    const backButton = document.querySelector('#backButton');
    backButton.style.display = 'none';

    document.querySelector('#searchInput').value = '';


}
const backButton = document.querySelector('#backButton');
backButton.onclick = () => {
    backToStart();
};

function searchRecipes() {
    const searchRecipe = document.querySelector('#searchInput').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchRecipe));
    displayRecipies(filteredRecipes);
}

document.querySelector('#searchButton').addEventListener('click', searchRecipes);



