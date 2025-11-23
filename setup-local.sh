#!/bin/bash

# DDE Local Setup (Without Docker)
# This script helps you run the application locally without Docker

echo "🚀 Setting up DDE for local development..."

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install it first:"
    echo "   sudo apt install postgresql postgresql-contrib"
    exit 1
fi

# Check if Redis is running
if ! command -v redis-cli &> /dev/null; then
    echo "❌ Redis is not installed. Please install it first:"
    echo "   sudo apt install redis-server"
    exit 1
fi

# Check Python version
if ! command -v python3.12 &> /dev/null; then
    echo "⚠️  Python 3.12 not found. Trying python3..."
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python 3 is not installed."
        exit 1
    fi
    PYTHON_CMD=python3
else
    PYTHON_CMD=python3.12
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+:"
    echo "   https://nodejs.org/"
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    $PYTHON_CMD -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Setup database
echo "Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE DATABASE dde_db;" 2>/dev/null || echo "Database may already exist"
sudo -u postgres psql -c "CREATE USER dde_user WITH PASSWORD 'dde_password';" 2>/dev/null || echo "User may already exist"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE dde_db TO dde_user;"

# Run migrations
echo "Running database migrations..."
alembic upgrade head

cd ..

# Setup Frontend
echo "📦 Setting up Frontend..."
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  uvicorn app.main:app --reload"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
