# Portfolio Analytics Backend

A lightweight, privacy-friendly analytics backend for tracking portfolio visitors with beautiful dashboard visualizations.

## Features

- 📊 Real-time visitor tracking
- 🌍 Geolocation tracking (country, city)
- 📱 Device and browser detection
- 📈 Beautiful dashboard with charts
- 🔒 Privacy-friendly (respects Do Not Track)
- 💾 Simple JSON file storage (no database needed)
- 🚀 Easy to deploy

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3001`

### 3. View Dashboard
Open your browser and navigate to:
```
http://localhost:3001/dashboard
```

## API Endpoints

### POST `/api/track`
Track a new visit.

**Request Body:**
```json
{
  "timestamp": "2025-10-16T10:30:00.000Z",
  "page": "/",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0...",
  "language": "en-US",
  "screenResolution": "1920x1080",
  "viewport": "1400x900",
  "timezone": "America/New_York",
  "location": {
    "ip": "1.2.3.4",
    "city": "New York",
    "region": "New York",
    "country": "United States",
    "countryCode": "US"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Visit tracked successfully"
}
```

### GET `/api/analytics`
Get analytics data and statistics.

**Response:**
```json
{
  "totalVisits": 1234,
  "uniqueVisitors": 456,
  "visitsByCountry": [["United States", 500], ["Canada", 200]],
  "visitsByCity": [["New York", 300], ["Toronto", 150]],
  "visitsByDay": [["2025-10-15", 50], ["2025-10-16", 75]],
  "browsers": [["Chrome", 800], ["Safari", 300]],
  "devices": [["Desktop", 900], ["Mobile", 334]],
  "recentVisits": [...]
}
```

## Dashboard Features

### Statistics Cards
- Total visits
- Unique visitors
- Number of countries
- Recent activity (last 30 days)

### Charts
- **Visits Over Time**: Line chart showing daily visits
- **Top Countries**: Doughnut chart of visitor countries
- **Browsers**: Bar chart of browser usage
- **Devices**: Pie chart of device types

### Tables
- Top countries with visit counts and percentages
- Top cities with visit counts
- Recent visits with timestamps, locations, and device info

## Data Storage

Analytics data is stored in `analytics-data.json` in the following format:

```json
{
  "visits": [
    {
      "id": "1697456789000",
      "timestamp": "2025-10-16T10:30:00.000Z",
      "page": "/",
      "location": {
        "country": "United States",
        "city": "New York"
      }
    }
  ]
}
```

The file automatically keeps only the last 10,000 visits to prevent it from growing too large.

## Deployment

### Render
1. Create a new Web Service
2. Connect your repository
3. Set build command: `cd analytics-backend && npm install`
4. Set start command: `cd analytics-backend && npm start`
5. Deploy!

### Railway
1. Create a new project from GitHub
2. Set `PORT` environment variable to `3001`
3. Deploy!

### Heroku
```bash
cd analytics-backend
heroku create
git push heroku main
```

### Environment Variables
- `PORT`: Server port (default: 3001)

## Security Considerations

### CORS
The backend uses CORS middleware to allow cross-origin requests. In production, you should restrict CORS to your domain:

```javascript
app.use(cors({
  origin: 'https://your-portfolio-domain.com'
}));
```

### Rate Limiting
Consider adding rate limiting for production to prevent abuse:

```bash
npm install express-rate-limit
```

Then add to server.js:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Development

### Install Dev Dependencies
```bash
npm install --save-dev nodemon
```

### Run in Development Mode
```bash
npm run dev
```

This will use nodemon to automatically restart the server when files change.

## Customization

### Modify Data Retention
Edit the visit limit in `server.js`:

```javascript
// Keep only last 10000 visits
if (data.visits.length > 10000) {
  data.visits = data.visits.slice(-10000);
}
```

### Add More Statistics
You can easily add more analytics calculations in the `/api/analytics` endpoint.

### Customize Dashboard
The dashboard is in `public/dashboard.html` and can be fully customized with your branding and additional visualizations.

## License

MIT

## Support

For issues or questions, please check the main ANALYTICS_SETUP.md guide.


