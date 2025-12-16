import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// ✅ Enable JSON parsing for request bodies
app.use(express.json());

/**
 * ✅ MongoDB Data API Proxy Endpoints
 * Avoids CORS issues by proxying requests through backend
 */
app.post('/api/mongo/destinations', async (req, res) => {
  try {
    const mongoResponse = await fetch(
      'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1/action/find',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'VFPCzeFPD5k38njwbVmpf2vXvwdlQsGpmNY7OTfeTwRE6wJWh9Ht0cpLjN18Cww8',
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'tripsaver',
          collection: 'destinations',
        }),
      }
    );

    const data = await mongoResponse.json();
    res.json(data);
  } catch (error) {
    console.error('MongoDB proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

app.post('/api/mongo/search', async (req, res) => {
  try {
    const { filter } = req.body;
    
    const mongoResponse = await fetch(
      'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1/action/find',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'VFPCzeFPD5k38njwbVmpf2vXvwdlQsGpmNY7OTfeTwRE6wJWh9Ht0cpLjN18Cww8',
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'tripsaver',
          collection: 'destinations',
          filter: filter || {},
        }),
      }
    );

    const data = await mongoResponse.json();
    res.json(data);
  } catch (error) {
    console.error('MongoDB search proxy error:', error);
    res.status(500).json({ error: 'Failed to search destinations' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
