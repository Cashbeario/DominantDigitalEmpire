#!/bin/bash

# Quick start script for local development (without Docker)

echo "🚀 Starting DDE locally..."

# Update .env for local development
cat > .env << 'EOF'
# PostgreSQL (Local)
POSTGRES_SERVER=localhost
POSTGRES_USER=dde_user
POSTGRES_PASSWORD=dde_password
POSTGRES_DB=dde_db
DATABASE_URL=postgresql+asyncpg://dde_user:dde_password@localhost:5432/dde_db

# FastAPI Backend
SECRET_KEY=your-super-secret-key-change-in-production-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Redis (Local)
REDIS_HOST=localhost
REDIS_PORT=6379

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

echo "✅ Environment configured for local development"

# Check if services are running
if ! systemctl is-active --quiet postgresql; then
    echo "⚠️  PostgreSQL is not running. Starting it..."
    sudo systemctl start postgresql
fi

if ! systemctl is-active --quiet redis; then
    echo "⚠️  Redis is not running. Starting it..."
    sudo systemctl start redis
fi

echo ""
echo "🔧 To run the application, open 2 terminals:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  python3 -m venv venv"
echo "  source venv/bin/activate"
echo "  pip install -r requirements.txt"
echo "  alembic upgrade head"
echo "  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
