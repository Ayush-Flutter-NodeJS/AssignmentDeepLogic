const { extractListItemsByClass, extractHrefAndHeadings } = require('./constant');
const http = require('http');
const https = require('https');
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/getTimeStories' && req.method === 'GET') {
        https.get('https://time.com/', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                const latestStories = extractListItemsByClass(data)
                const eachLatestStory = extractHrefAndHeadings(latestStories);
                res.end(JSON.stringify(eachLatestStory));
            });

        }).on('error', (error) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching data');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


