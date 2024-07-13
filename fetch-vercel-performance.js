const { getMetrics } = require('@vercel/speed-insights');

// Replace 'your-vercel-token' with your actual Vercel API token
const vercelToken = 'iDw3VDrJH1nZjHn0lYH5mplV';

// Replace 'your-project-id' with your actual Vercel project ID
const projectId = 'prj_lPo9xt3j6gP8Betvj3TY2q9Jz6QF';

async function fetchPerformanceMetrics() {
  try {
    const metrics = await getMetrics({ token: vercelToken, projectId });
    console.log('Performance metrics:', metrics);
    // Process and use metrics as needed
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
  }
}

fetchPerformanceMetrics();