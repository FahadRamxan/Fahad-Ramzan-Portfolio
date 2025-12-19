// Custom Analytics Tracker
// This script tracks page views and sends them to your analytics backend

(function() {
    'use strict';
    
    // Configuration - Update this with your backend URL
    const ANALYTICS_API_URL = 'http://localhost:3001/api/track'; // Change this to your deployed backend URL
    
    // Check if tracking is enabled (respect Do Not Track)
    const isDNT = navigator.doNotTrack === '1' || window.doNotTrack === '1';
    
    if (isDNT) {
        console.log('Analytics: Do Not Track is enabled, skipping tracking');
        return;
    }
    
    // Function to get visitor information
    async function getVisitorInfo() {
        const visitorInfo = {
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenResolution: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        // Get location data from IP (using a free API)
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const locationData = await response.json();
                visitorInfo.location = {
                    ip: locationData.ip,
                    city: locationData.city,
                    region: locationData.region,
                    country: locationData.country_name,
                    countryCode: locationData.country_code,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    timezone: locationData.timezone
                };
            }
        } catch (error) {
            console.log('Analytics: Could not fetch location data', error);
        }
        
        return visitorInfo;
    }
    
    // Function to send tracking data to backend
    async function trackPageView() {
        try {
            const visitorInfo = await getVisitorInfo();
            
            // Send to custom backend
            await fetch(ANALYTICS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(visitorInfo)
            });
            
            console.log('Analytics: Page view tracked successfully');
        } catch (error) {
            console.log('Analytics: Error tracking page view', error);
        }
    }
    
    // Track page view on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackPageView);
    } else {
        trackPageView();
    }
    
    // Track page visibility changes (when user returns to tab)
    let wasHidden = false;
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && wasHidden) {
            // User returned to the page
            trackPageView();
        }
        wasHidden = document.hidden;
    });
    
})();


