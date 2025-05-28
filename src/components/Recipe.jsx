import ReactMarkdown from 'react-markdown';

export default function Recipe( {recipeText} ) {
    return (
        <ReactMarkdown>{recipeText}</ReactMarkdown>
    )
}