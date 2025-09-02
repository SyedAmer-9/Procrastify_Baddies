import { useState,useEffect } from "react";

function QuoteDisplay(){
    const [quote,setQuote] = useState(null)

    useEffect(()=>{
        const fetchQuote = async () =>{
            const apiKey = import.meta.env.VITE_NINJAS_API_KEY;
            try{
                const response = await fetch('https://api.api-ninjas.com/v1/quotes',{headers :{'X-Api-Key':apiKey}});
                const data = await response.json();
                setQuote(data[0]);
            }catch(error){
                console.error("Failed to fetch quote",error);
            }
        }
        fetchQuote();
    },[]);

    if(!quote){
        return <p className="text-center text-gray-500">Loading quote....</p>
    }

    return(
        <div className="mt-8 p-4 border-t border-gray-200 dark:border-gray-700">
            <blockquote className="text-center italic text-gray-600 dark:text-gray-400">
                "{quote.quote}"
                <footer className="mt-2 text-sm not-italic font-semibold text-gray-700 dark:text-gray-300">
                    -{quote.author}
                </footer>
            </blockquote>
        </div>
    );
}
export default QuoteDisplay;