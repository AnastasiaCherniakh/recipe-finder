export default function IngredientsList({ ingredients, getRecipe }) {

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <li key={`${ingredient}-${index}`}>{ingredient}</li>
    ));

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className='ingredient-list'>{ingredientListItems}</ul>
            {ingredients.length > 3 && <div className='get-recipe-container'>
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients</p>
                </div>
            <button onClick={() => getRecipe(ingredients)} className='get-recipe-button'>Get a recipe</button>
            </div>}
        </section>
    )
}