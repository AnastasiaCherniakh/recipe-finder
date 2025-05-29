import { useState } from 'react';
import Instructions from './Instructions';
import IngredientsList from './IngredientsList';
import Recipe from './Recipe';
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
export default function MainContent() {

    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function addIngredient(formData) {
        const rawInput = formData.get("ingredient");
        const cleanedInput = rawInput.trim().toLowerCase();

        // Validate empty or whitespace-only input
        if(!cleanedInput) {
            toast.error("Please enter a valid ingredient");
            return;
        }

        // Prevent duplicates
        if(ingredients.includes(cleanedInput)){
            toast.error("You already added this ingredient");
            return;
        }

        setIngredients(prevIngredients => [...prevIngredients, cleanedInput]);
        toast.success(`${cleanedInput} added!`);
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
            {ingredients.length === 0 &&  <Instructions />}
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}
            {isLoading ? (
                <div className="spinner">
                    <ClipLoader
                        color="#7c3bed"
                        size={60}
                        aria-label="Loading Spinner"
                    />
                </div>
            ) : (
                recipe && (
                    <section className='recipe'>
                        <h2>Your Recipe</h2>
                        <div className="markdown">
                            <Recipe recipeText={recipe} />
                        </div>
                    </section>)
            )}
        </main>
    )
}