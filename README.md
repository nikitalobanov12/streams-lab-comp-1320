# streams-lab-comp-1320
week 10 streams lab

# Your Task:

First of all, I don’t recommend opening up the file on your computer. It is *very large* and depending on how much RAM your PC has, you may potentially freeze your computer or make it perform very slowly. That being said, you can preview what the file looks like through the Kaggle URL. 

The data set you have been provided is a series of reviews for Cellphone & Accessories related products on Amazon.com. 

Step 1: Read the ndjson file you downloaded as a readable stream. 

**ndjson is a file format similar to json but slightly different. The nd stands for “newline delimited”, and you will notice that each JSON object (dictionary) is seperated by a new line. It is more convenient for us however to work with standard JSON objects, so…**

Step 2: Parse the NDJSON into standard JSON using the ndjson module. This will allow you to work with standard json objects within your pipeline. 

Step 3: Next, you need to create a transform stream called `filterSpam`. This stream is responsible for only allowing non-spam records to make it through the stream. If you look at the preview of each ndjson object in Kaggle, you should be able to find a property that will help you figure out if a review is spam or not. 

Step 4: Next, you need to create a transform stream called `checkPositivity` that calculates
and adds to each object a positivity score from the review text based on AFINN. The AFINN lexicon is a list of English terms manually rated for valence with an integer between -5 (negative) and +5 (positive) by Finn Årup Nielsen between 2009 and 2011.

You can find the AFINN dataset here:

https://raw.githubusercontent.com/darenr/afinn/master/afinn_en.js

Step 5: Once you are done this, you should write this out to a new file called scored_data.ndjson. It should contain all the non-spam reviews inside it, each containing a positivity score.

Step 6: For this final step, I want you to comment out the code that you wrote earlier since we have already produced a spam-free positivity-scored ndjson file called scored_data.ndjson. The problem is, it’s difficult to know which reviews are really negative and which ones are positive since the positivity score will be different for every review. For this step, you will use a library that will help you efficiently sort the data from most negative to least negative. (The lower positivity scored reviews should show up first, and towards the end of the file should be the most positive reviews). This way, we can immediately see the most negative reviews upfront. In order to accomplish this, you must use the following module:

https://www.npmjs.com/package/external-sorting

Write the sorted data to a new filed called sortedData.ndjson.
