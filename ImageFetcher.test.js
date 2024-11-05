const axios = require('axios');
const fetchImageUrls = require('./imageFetcher.js');

// Mock axios
jest.mock('axios');

describe('fetchImageUrls', () => {
    it('should fetch image URLs based on the query and limit to maxResults', async () => {
        // Mock API response from Serper.dev
        const mockApiResponse = {
            data: {
                images: [
                    { imageUrl: 'https://example.com/image1.jpg' },//Examples
                    { imageUrl: 'https://example.com/image2.jpg' },
                    { imageUrl: 'https://example.com/image3.jpg' }
                ]
            }
        };

        axios.request.mockResolvedValue(mockApiResponse);

        const query = "test query";
        const maxResults = 2;

        const imageUrls = await fetchImageUrls(query, maxResults);

        expect(imageUrls).toEqual([
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg'
        ]);
        expect(imageUrls.length).toBe(maxResults);

        expect(axios.request).toHaveBeenCalledWith({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://google.serper.dev/images',
            headers: {
                'X-API-KEY': process.env.SERPER_API_KEY,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ "q": query })
        });
    });

    it('should throw an error if the API request fails', async () => {
        axios.request.mockRejectedValue(new Error('API request failed'));

        const query = "test query";

        await expect(fetchImageUrls(query)).rejects.toThrow('API request failed');
    });
});
