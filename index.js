const fetchImageUrls = require('./imageFetcher');
const downloadAndResizeImage = require('./imageProcessor');
const saveImageToDatabase = require('./database');
const path = require('path');

const main = async (query, maxResults = 5) => {
    const imageUrls = await fetchImageUrls(query, maxResults);

    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const outputPath = path.resolve(__dirname, `images/image_${i}.jpg`);
        await downloadAndResizeImage(url, outputPath);

        await saveImageToDatabase(query, url, null);
    }

    console.log("All images processed.");
};

main("cute kittens", 5);
