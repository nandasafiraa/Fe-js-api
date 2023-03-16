const searchBtn = document.getElementById('search-btn');
const mealContainer = document.getElementById('meal');
const mealDetailsContent = document.getElementById('meal-details-content');
const searchBtn2 = document.getElementById('search-meal');
const mealList2 = document.getElementById('some-meal');

// event listeners
if(searchBtn) searchBtn.addEventListener('click', getMealList);
if(searchBtn2) searchBtn2.addEventListener('click', getNameMealList);

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div data-id = "${meal.idMeal}" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img class="rounded-t-lg" src="${meal.strMealThumb}" alt="Gambar Makanan" />
                            <div class="p-5 text-center">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${meal.strMeal}</h5>
                                <a onclick="getMealRecipe(${meal.idMeal})" class="recipe-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-secondary1 rounded-lg hover:bg-secondary3 focus:ring-4 focus:outline-none focus:ring-secondary4">
                                    View Receipe
                                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                    </div>
                `;
            });
            mealContainer.classList.remove('notFound');
        }else{
            html = "Sorry, we didn't find any meal!";
            mealContainer.classList.add('notFound');
        }

        mealContainer.innerHTML = html;
    });
}

// get name meal list
function getNameMealList(){
    let searchInputTxt2 = document.getElementById('search-inputMeal').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt2}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            let meal = data.meals[0]
            let ingredient = ''
            for(const m in meal){
                if(m.includes('strIngredient')&&meal[m]){
                    ingredient += `
                         <div class="">
                            <ol class="relative border-l border-gray-200">
                            <li class="mb-10 ml-6">            
                                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </span>
                                <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">${meal[m]}</h3>
                            </li>                            
                            </ol>
                        </div>
                    `
                }
            }
            html += `
                    <div class="flex flex-wrap">
                <div class="flex justify-center w-full px-4 lg:w-1/2 order-1 md:order-1">
                    <div class="">
                        <img src="${meal.strMealThumb}" alt="Hasil Masakan" class="w-3/4 md:max-w-full mx-auto py-10">
                        <div class="flex justify-center items-center text-center pb-14">
                            <a href="${meal.strYoutube}" target="_blank">
                                <img class="rounded-t-lg justify-center items-center text-center w-10 h-10" src="img/play.png" alt="Gambar Detail Makanan" />
                            </a>
                             <p class="font-SourceSansPro font-semibold text-base text-secondary1 leading-6 ml-3">Watch Video</p>  
                        </div>
                    </div>
                </div>

                <div class="flex flex-col w-full mx-auto md:w-1/2 order-2 md:order-2">
                    <h1 class="font-SourceSansPro font-bold text-3xl text-tombol3 leading-10 text-center md:text-center">${meal.strMeal}</h1>
                    <i>
                        <p class="font-SourceSansPro font-medium text-base text-secondary5 leading-6 text-center mx-2 py-2 md:mt-0 mb-0">- ${meal.strArea}</p>
                    </i> 
                    <div class="flex my-8 bg-warnaBg1 mx-8">
                        <span class="font-SourceSansPro font-semibold text-base text-secondary2 leading-6 mx-2 py-2">Category : </span>
                        <span class="font-SourceSansPro font-normal text-sm text-secondary5 leading-6 py-2">${meal.strCategory}</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-4">
                        ${ingredient}
                    </div>
                </div>

                </div>
                <div class="mx-8 md:mx-24">
                    <p class="font-SourceSansPro font-semibold text-base text-secondary2 leading-6 pb-3">Instructions :</p>
                    <p class="font-SourceSansPro font-normal text-base text-secondary5 leading-6 mb-10">${meal.strInstructions}</p>
                </div>
                `;
            // mealList2.classList.remove('notFound');
        }else{
            html = "Sorry, we didn't find any meal!";
            mealList2.classList.add('notFound');
        }
        console.log(html)
        mealList2.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e){
    localStorage.setItem("id_ingredient", e);
    window.location = "DetailIngredient.html";
}

if(mealDetailsContent) {
    let id_ingredient = localStorage.getItem("id_ingredient");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id_ingredient}`)
        .then(response => response.json())
        .then(data => {
    let meal = data.meals[0];
    let html = `
        <div class="flex-col justify-center items-center text-center">
            <h1 class="font-SourceSansPro font-bold text-3xl text-tombol3 leading-10 mb-5">${meal.strMeal}</h1>
            <div class="flex justify-center items-center text-center mb-8 md:pb-10 md:mb-10 bg-warnaBg1">
                <span class="font-SourceSansPro font-semibold text-base text-secondary2 leading-6 mx-2 py-2">Category : </span>
                <span class="font-SourceSansPro font-normal text-sm text-secondary6 leading-6 py-2">${meal.strCategory}</span>
            </div>
            <div class="flex flex-col justify-center items-center md:mt-10" style="margin-top: 20px;">
                <img class="rounded-t-lg justify-center items-center text-center mb-8 md:mt-10 md:w-1/2 md:h-1/2" src="${meal.strMealThumb}" alt="Gambar Detail Makanan" style="width:50%; height:50%" />
            </div>
            <div class="flex justify-center items-center text-center pb-5">
                <a href="${meal.strYoutube}">
                    <img class="rounded-t-lg justify-center items-center text-center w-10 h-10" src="img/play.png" alt="Gambar Detail Makanan" />
                    <p class="font-SourceSansPro font-semibold text-base text-secondary1 leading-6 ml-3">Watch Video</p>
                </a>            
            </div>
        </div>
        <div class="mx-8 md:mx-24">
            <p class="font-SourceSansPro font-semibold text-base text-secondary2 leading-6 pb-3">Instructions :</p>
            <p class="font-SourceSansPro font-normal text-base text-secondary6 leading-6 mb-10">${meal.strInstructions}</p>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
        });
}

//get category

