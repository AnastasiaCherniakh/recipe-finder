import 'dotenv/config';

// Fetch a recipe based on a list of ingredients
export async function handler(event) {

    try{
        const apiKey = process.env.OPENROUTER_API_KEY;

        const { ingredients } = JSON.parse(event.body);

        // Create a prompt for the AI model
        const prompt = `Give me a recipe using the following ingredients: ${ingredients.join(', ')}`;
    
         // Send a request to OpenRouter to get a recipe from the AI model
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ 
                model: "deepseek/deepseek-chat:free",
                messages : [
                    {role: "user", content: prompt} // User message sent to the model
                ]
             })
        });

        if(!response.ok){
            const errorText = await response.text();
            return {
                statusCode: response.status,
                body: JSON.stringify({error: `OpenRouter error: ${errorText}`})
            }
        };

        const result = await response.json();
    
        return {
            statusCode: 200,
            body: JSON.stringify({ recipe: result.choices[0].message.content || "Sorry, something went wrong!" })
        };

    }catch(error){
        console.error("Function error:", error); 
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Server error: ${error.message}` })
        }
    };
}