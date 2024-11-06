require('dotenv').config();
const axios = require('axios');


const fetchImageUrls = async (query, maxResults = 5) => {
    const data = JSON.stringify({ "q": query });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://google.serper.dev/images',
        headers: {
            'X-API-KEY': process.env.SERPER_API_KEY, 
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        const imageUrls = response.data.images.map(image => image.imageUrl);

        return imageUrls.slice(0, maxResults);  // Limit to the maxResults count
    } catch (error) {
        console.error("Error fetching image URLs from Serper.dev:", error);
        throw error;
    }
};

module.exports = fetchImageUrls;
