import { useState } from 'react';
import IngredientsList from './IngredientsList';
export default function MainContent() {

    const [ingredients, setIngredients] = useState([]);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input type="text" name="ingredient" aria-label="Add ingredient" placeholder="e.g. tomatoes" />
                <button>Add Ingredient</button>
            </form>
        {ingredients.length > 0 && <IngredientsList ingredients={ingredients} />}
        </main>
    )
}