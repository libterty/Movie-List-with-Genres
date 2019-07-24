# Movie-List-With-Genres

A simple web application for Movie List

## Features

- Movie list api is contributed from Alpha Camp
- User's can use the main page to review all listed movies
- Movie profile includes poster's, title's and tags for each category
- Click the listed Movie can show the movies which has been categorized

## Change Log
- Due to several function cannot pass unit test, there are some several changes
- Changing dataTemp structures due to bug issue
- Seperate emptyContent function
- Style changing


### Listing
An Init stage where the page will shown blank if you are first visit the site.

### Categorization
Categorization allows you to use listing movie which you have already prepared for you to make it easier to find what you need. The blank parts which we have mentioned before will include the movies categorized in this categorization. Movie Information `image`, `title` and `genres`. Thanks for the contribution from Alpha Camp api.

### Improving and hash tag add
In index page, we will add hash tag and function that can direct link to the listed part. Improving the performance and efficiency of the function to remain consistency and reduce repsonding time.
Adding statements for those don't have genres list, e.g. `Documentary`, `TV Movie`, `Western`