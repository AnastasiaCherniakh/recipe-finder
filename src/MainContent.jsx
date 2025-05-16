import { useState } from 'react';
export default function MainContent() {

    const [ingredients, setIngredients] = useState([]);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    const ingredientListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ));

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input type="text" name="ingredient" aria-label="Add ingredient" placeholder="e.g. tomatoes" />
                <button>Add Ingredient</button>
            </form>
        {ingredients.length > 0 && <section>
            <h2>Ingredients on hand:</h2>
            <ul className='ingredient-list'>{ingredientListItems}</ul>
            {ingredients.length > 3 && <div className='get-recipe-container'>
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients</p>
                </div>
            <button className='get-recipe-button'>Get a recipe</button>
            </div>}
        </section>}
        </main>
    )
}