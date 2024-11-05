# Image Downloader and Resizer

This project is a Node.js script that downloads images based on a search query, resizes them, and saves them to a PostgreSQL database. It utilizes the Serper.dev API for fetching image URLs and the Sharp library for image processing.

## Features

- Fetch images from Google search results.
- Resize images to specified dimensions.
- Store image information in a PostgreSQL database.
- Asynchronous programming for improved performance.
- Docker support for easy deployment.

## Prerequisites

- Node.js (version 14 or later)
- PostgreSQL database
- Serper.dev API key (sign up for an account and get your API key)

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using npm:
   - Run `npm install`
4. Create a .env file in the root directory with the following content. You can either use your own API key by signing up on serper.dev or use the example key provided below."
   - `SERPER_API_KEY=4264ac4a0e173e9dac60e52c17d193256a65d79c`
   - `DATABASE_URL=ppostgres://username:password@localhost:5432/your_database`
 
## Usage

1. Run the script:
   - Use the command `npm start` and provide the necessary arguments for the search query and the maximum number of images.
  
## Testing

Run unit tests using:
- `npm test`

