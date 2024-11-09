const {createReadStream, createWriteStream} = require("node:fs");
const ndjson = require('ndjson');
const { Transform } = require('node:stream');
const afinn = require('./AFINN.json')


const filepath = "Cell_Phones_and_Accessories.json";
const outputFile = "Cell_Phones_and_Accessories.ndjson";


//filters all the spam messages out by checking if their "class" value is 0 or 1
//the dataset indicated that 0 means not-spam and 1 means spam
const filterSpam = () => {
    return new Transform({
        objectMode: true,
        transform : (chunk, enc, callback) => {
            if (chunk.class === 0) callback(null, chunk)
            else callback(null);
        }
    })
}

// check each word in the review and assign a AFINN value to it by checking it in the afinn.json dataset
// add the total AFINN score and assign it to the review
const checkPositivity = () => {
    return new Transform ({
        objectMode: true,
        transform: (chunk, enc, callback) => {
            //split the review into an array of words that we can iterate over
            const words = chunk.reviewText
            //removes all the punctuation so we just have words
            .replace(/[^\w\s]|_/g, "") 
            .toLowerCase()
            .split(" "); 


            //words.reduce calculates adds up all the values of an array, where acc is the counter that stores the total sum, and word is the current word that it's looping through
            //afinn[word] returns the int value assigned to that word from the afinn.json file
            //some words don't exist in the dataset, "|| 0" makes sure that these words don't break the counter
            const afinnScore = words.reduce((acc, word) => acc + (afinn[word] || 0), 0) 
         
            //add the affin score to the review object
            chunk.afinnScore = afinnScore;
            callback(null, chunk);
        }
    })
}



createReadStream(filepath)
.pipe(ndjson.parse())
.pipe(filterSpam())
.pipe(checkPositivity())
.pipe(ndjson.stringify())
.pipe(createWriteStream(outputFile))
.on("finish", () => console.log(`ndjson file writted to ${outputFile}`))
.on('error', err => console.error(err));
