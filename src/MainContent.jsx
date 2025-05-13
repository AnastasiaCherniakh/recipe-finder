export default function MainContent() {
    return (
        <main>
            <form className="add-ingredient-form">
                <input type="text" aria-label="Add ingredient" placeholder="e.g. tomatoes" />
                <button>Add Ingredient</button>
            </form>
        </main>
    )
}