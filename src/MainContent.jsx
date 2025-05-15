import { useState } from 'react';
export default function MainContent() {

    const [ingredients, setIngredients] = useState([]);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    const ingredientListItem = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ));

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input type="text" name="ingredient" aria-label="Add ingredient" placeholder="e.g. tomatoes" />
                <button>Add Ingredient</button>
            </form>
        <ul>
            {ingredientListItem}
        </ul>
        </main>
    )
}