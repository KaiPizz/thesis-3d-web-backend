# Furniture Showroom Backend

Backend API for the Interactive 3D Furniture Showroom.

## Tech Stack

- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Create a `.env` file in the backend folder:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

### 3. Initialize the database

```bash
npm run prisma:migrate
```

### 4. Run development server

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio GUI |

## API Endpoints

### Health Check

- `GET /health` → `{ status: "ok" }`

### Public API (coming soon)

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/:id/variants`
- `GET /api/categories`

### Admin API (coming soon)

- `POST /api/admin/products`
- `PUT /api/admin/products/:id`
- `DELETE /api/admin/products/:id`
- `POST /api/admin/products/:id/variants`
- `PUT /api/admin/variants/:id`
- `DELETE /api/admin/variants/:id`

