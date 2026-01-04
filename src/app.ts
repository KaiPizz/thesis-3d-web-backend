import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://kaipizz.github.io'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Disable caching for API responses
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(express.json());
app.use(routes);

export default app;