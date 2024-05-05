const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const copyBtn=document.getElementById('copy');
const loader=document.getElementById('loader');
let apiQuotes=[];

//Show loading

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
//function new quote
function newQuote(){
    loading();
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //if author name is  niot present replace it with 'unknown string'
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent=quote.author;
    }
    //change font size based on quote length
    if(quote.text.length>130){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    //set quote, hide loader
    quoteText.textContent=quote.text;
    complete();
}
// get quotes from API
async function getQuotes(){
    
    const apiURL="https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
        const response=await fetch(apiURL);
        apiQuotes=await response.json();
        newQuote();
    }catch(error){
        
        //catch error here
    }
}
function copyContent(){
    let text=document.getElementById('quote').innerHTML;
    const content=async()=>{
        try{
            await navigator.clipboard.writeText(text);
            console.log('Content copied to clipboard');
        }
        catch(error){
            console.log('Failed to copy',error);
        }
    }
    content();
}
//tweet quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);
copyBtn.addEventListener('click',copyContent);
//onload 
getQuotes();
