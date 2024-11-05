const axios = require('axios');
const sharp = require('sharp');


const downloadAndResizeImage = async (url, outputFilePath) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        await sharp(buffer)
            .resize(200, 200) // Resize image to 200x200 pixels
            .toFile(outputFilePath); // Save to specified file path

        console.log(`Image saved at ${outputFilePath}`);
    } catch (error) {
        console.error("Error downloading or resizing image:", error.message);
    }
};

module.exports = downloadAndResizeImage;
