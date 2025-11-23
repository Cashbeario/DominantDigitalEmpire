# Dominant Digital Empire (DDE) - Setup Guide

The ultimate multi-tenant SaaS platform for digital agencies, MSPs, and hosting companies.

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Make (optional, for easier commands)
- Node.js 20+ (for local development without Docker)
- Python 3.12+ (for local development without Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DominantDigitalEmpire
   ```

2. **Copy environment file**
   ```bash
   cp .env.example .env
   ```

3. **Update environment variables** (optional)
   Edit `.env` file and update the SECRET_KEY and other settings as needed.

4. **Start the application**
   ```bash
   make up
   # or
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   make migrate
   # or
   docker-compose exec backend alembic upgrade head
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/docs
   - Database: localhost:5432

## 📦 Project Structure

```
DominantDigitalEmpire/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Configuration & security
│   │   ├── crud/           # Database operations
│   │   ├── db/             # Database setup
│   │   ├── models/         # SQLAlchemy models
│   │   └── schemas/        # Pydantic schemas
│   ├── alembic/            # Database migrations
│   └── tests/              # Backend tests
├── frontend/               # Next.js frontend
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   └── lib/                # Utilities
└── docker-compose.yml      # Docker services
```

## 🔧 Available Commands

### Using Make

```bash
make help              # Show all available commands
make up                # Start all services
make down              # Stop all services
make build             # Rebuild services
make logs              # View logs (or: make logs s=backend)
make migrate           # Run database migrations
make makemigrations m="description"  # Create new migration
make test              # Run tests
make clean             # Clean up containers and volumes
make shell             # Open backend shell
```

### Using Docker Compose Directly

```bash
docker-compose up -d            # Start services
docker-compose down             # Stop services
docker-compose logs -f backend  # View backend logs
docker-compose exec backend alembic upgrade head  # Run migrations
```

## 📝 Usage

### Register a New Agency

1. Navigate to http://localhost:3000
2. Click "Get Started" or "Sign up"
3. Fill in your agency details:
   - Agency Name
   - Your Name
   - Email
   - Password
4. Click "Create account"

### Login

1. Go to http://localhost:3000/login
2. Enter your email and password
3. You'll be redirected to the agency dashboard

### Add a Client

1. From the agency dashboard, click "Clients" in the sidebar
2. Click "Add Client"
3. Fill in client details:
   - Contact Name
   - Email
   - Company Name (optional)
   - Industry (optional)
4. Click "Create Client"
5. A new website will be automatically provisioned!

## 🏗️ Architecture

### Backend (FastAPI)

- **Multi-tenant architecture** with row-level security
- **JWT authentication** for secure API access
- **SQLAlchemy ORM** with async support
- **Alembic migrations** for database schema management
- **Pydantic schemas** for data validation

### Frontend (Next.js 14)

- **App Router** for modern routing
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful components
- **TypeScript** for type safety

### Database (PostgreSQL)

- **Multi-tenant** data isolation
- **UUID** primary keys
- **Timestamps** for audit trails

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Row-level tenant isolation
- CORS protection
- Environment-based secrets

## 🎨 Key Features

### For Agencies
- Multi-client management
- Automated client onboarding
- Website provisioning
- White-label branding
- Client portal access

### For Clients
- Dedicated dashboard
- Website management
- Analytics & insights
- Support system

## 🐛 Troubleshooting

### Port Already in Use

If you see "port already in use" errors:

```bash
# Stop any running services
make down

# Or manually kill processes on specific ports
lsof -ti:3000 | xargs kill  # Frontend
lsof -ti:8000 | xargs kill  # Backend
lsof -ti:5432 | xargs kill  # PostgreSQL
```

### Database Connection Issues

```bash
# Restart the database
docker-compose restart db

# Check database logs
docker-compose logs db

# Run migrations again
make migrate
```

### Frontend Build Issues

```bash
# Rebuild the frontend container
docker-compose build frontend

# Clear Next.js cache
rm -rf frontend/.next
```

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🧪 Testing

```bash
# Run all backend tests
make test

# Run specific test file
docker-compose exec backend pytest tests/test_auth.py

# Run with coverage
docker-compose exec backend pytest --cov=app tests/
```

## 🚀 Production Deployment

For production deployment:

1. Update environment variables in `.env`
2. Set `SECRET_KEY` to a strong random value
3. Configure production database
4. Set up SSL certificates
5. Use production-ready web server (e.g., Nginx)
6. Enable monitoring and logging

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

For support and questions, please contact your development team.

---

**Built with ❤️ using FastAPI, Next.js, and modern web technologies**
