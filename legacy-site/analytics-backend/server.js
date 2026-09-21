const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'analytics-data.json');

// Middleware - Allow requests from your GitHub Pages domain
const allowedOrigins = [
    'https://fahadramxan.github.io',
    'http://localhost:5500',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now, restrict later
        }
    }
}));

app.use(express.json());
app.use(express.static('public'));

// Initialize data file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify({ visits: [] }));
    }
}

// Read analytics data
async function readAnalyticsData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { visits: [] };
    }
}

// Write analytics data
async function writeAnalyticsData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// API endpoint to track visits
app.post('/api/track', async (req, res) => {
    try {
        const visitorData = {
            ...req.body,
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        };
        
        const data = await readAnalyticsData();
        data.visits.push(visitorData);
        
        // Keep only last 10000 visits to prevent file from getting too large
        if (data.visits.length > 10000) {
            data.visits = data.visits.slice(-10000);
        }
        
        await writeAnalyticsData(data);
        
        res.json({ success: true, message: 'Visit tracked successfully' });
    } catch (error) {
        console.error('Error tracking visit:', error);
        res.status(500).json({ success: false, message: 'Error tracking visit' });
    }
});

// API endpoint to get analytics data
app.get('/api/analytics', async (req, res) => {
    try {
        const data = await readAnalyticsData();
        const visits = data.visits;
        
        // Calculate statistics
        const totalVisits = visits.length;
        const uniqueVisitors = new Set(visits.map(v => v.location?.ip || 'unknown')).size;
        
        // Visits by country
        const visitsByCountry = visits.reduce((acc, visit) => {
            const country = visit.location?.country || 'Unknown';
            acc[country] = (acc[country] || 0) + 1;
            return acc;
        }, {});
        
        // Visits by city
        const visitsByCity = visits.reduce((acc, visit) => {
            const city = visit.location?.city || 'Unknown';
            acc[city] = (acc[city] || 0) + 1;
            return acc;
        }, {});
        
        // Visits over time (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentVisits = visits.filter(v => new Date(v.timestamp) > thirtyDaysAgo);
        
        // Daily visits
        const visitsByDay = recentVisits.reduce((acc, visit) => {
            const date = new Date(visit.timestamp).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        
        // Browser statistics
        const browsers = visits.reduce((acc, visit) => {
            const ua = visit.userAgent || '';
            let browser = 'Other';
            
            if (ua.includes('Chrome')) browser = 'Chrome';
            else if (ua.includes('Firefox')) browser = 'Firefox';
            else if (ua.includes('Safari')) browser = 'Safari';
            else if (ua.includes('Edge')) browser = 'Edge';
            
            acc[browser] = (acc[browser] || 0) + 1;
            return acc;
        }, {});
        
        // Device types
        const devices = visits.reduce((acc, visit) => {
            const ua = visit.userAgent || '';
            let device = 'Desktop';
            
            if (/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) {
                device = 'Mobile';
            } else if (/Tablet|iPad/i.test(ua)) {
                device = 'Tablet';
            }
            
            acc[device] = (acc[device] || 0) + 1;
            return acc;
        }, {});
        
        // Referrers
        const referrers = visits.reduce((acc, visit) => {
            const referrer = visit.referrer || 'Direct';
            acc[referrer] = (acc[referrer] || 0) + 1;
            return acc;
        }, {});
        
        // Most visited pages
        const pages = visits.reduce((acc, visit) => {
            const page = visit.page || '/';
            acc[page] = (acc[page] || 0) + 1;
            return acc;
        }, {});
        
        const analytics = {
            totalVisits,
            uniqueVisitors,
            visitsByCountry: Object.entries(visitsByCountry)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10),
            visitsByCity: Object.entries(visitsByCity)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10),
            visitsByDay: Object.entries(visitsByDay).sort((a, b) => a[0].localeCompare(b[0])),
            browsers: Object.entries(browsers).sort((a, b) => b[1] - a[1]),
            devices: Object.entries(devices).sort((a, b) => b[1] - a[1]),
            referrers: Object.entries(referrers).sort((a, b) => b[1] - a[1]).slice(0, 10),
            pages: Object.entries(pages).sort((a, b) => b[1] - a[1]),
            recentVisits: visits.slice(-50).reverse() // Last 50 visits
        };
        
        res.json(analytics);
    } catch (error) {
        console.error('Error getting analytics:', error);
        res.status(500).json({ success: false, message: 'Error getting analytics' });
    }
});

// Serve the dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Initialize and start server
initializeDataFile().then(() => {
    app.listen(PORT, () => {
        console.log(`Analytics server running on http://localhost:${PORT}`);
        console.log(`Dashboard available at http://localhost:${PORT}/dashboard`);
    });
});

