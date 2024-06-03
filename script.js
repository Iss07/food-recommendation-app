const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-contents');
const recipeCloseBtn = document.getElementById('recipie-close-btn');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipie');
});

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipie-title">${meal.strMeal}</h2>
        <p class="recipie-category">${meal.strCategory}</p>
        <div class="recipie-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
            <div class="recipie-meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="recipie-link">
                <a href="${meal.strYoutube}" target="_blank">Watch video</a>
            </div>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipie');
}
const spinner = document.querySelector('.spinner');


function hideSpinner() {
  spinner.classList.add('hidden');
}
setTimeout(hideSpinner, 4000);

const preloaderContainer = document.querySelector('.preloader-container');


function hidePreloader() {
  preloaderContainer.classList.add('hidden');
}

setTimeout(hidePreloader, 4000);
  