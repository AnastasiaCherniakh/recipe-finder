import 'dotenv/config';

// Fetch a recipe based on a list of ingredients
export async function handler(event) {

    // Allow only POST
    if(event.httpMethod !== 'POST'){
        return {
            statusCode: 405,
            body: JSON.stringify({error: 'Method not allowed, use POST'}),
        };
    }
    
    // Parse request body safely
    let ingredients;
    try {
        const body = event.body || '{}';
        const parsed = JSON.parse(body);
        ingredients = parsed.ingredients;
        if(!Array.isArray(ingredients) || ingredients.length === 0){
            return {
                statusCode: 400,
                body: JSON. stringify({error: "Missing or invalid ingredients."}),
            };
        }
    }catch(err){
        return{
            statusCode: 400,
            body: JSON.stringify({error: "Invalid JSON in request body"}),
        };
    }

    // Check API key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if(!apiKey){
        return {
            statusCode: 500,
            body: JSON.stringify({error: "API key is missing."})
        }
    }

    // Call OpenRouter API
    try{
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
                model: "x-ai/grok-4-fast:free",
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