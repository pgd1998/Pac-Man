// This file bridges Vercel's serverless functions with the Express app
import app from '../back-end/index.js';

export default async function handler(req, res) {
  // Forward the request to your Express app
  return app(req, res);
}