import { useState } from 'react';
import IngredientsList from './IngredientsList';
export default function MainContent() {

    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    async function getRecipe(ingredients) {
        setIsLoading(true);
        try{
            const response = await fetch('/.netlify/functions/getRecipe', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ingredients })
            });
    
            const data = await response.json();
            setRecipe(data.recipe);
        }catch(error){
            console.log("Something went wrong while fetching the recipe.", error)
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input type="text" name="ingredient" aria-label="Add ingredient" placeholder="e.g. tomatoes" />
                <button>Add Ingredient</button>
            </form>
        {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}
        {isLoading ? (
            <p className='loading'>Generating...</p>
        ) : (
            recipe && (
                <section>
                    <h2>Your Recipe</h2>
                    <pre>{recipe}</pre>
                </section>)
        )}
        </main>
    )
}