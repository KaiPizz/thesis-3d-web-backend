import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',           // Local development
  'http://localhost:4173',           // Local preview
  'https://kaipizz.github.io'        // GitHub Pages production
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use(routes);

export default app;