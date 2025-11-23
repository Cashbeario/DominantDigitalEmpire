.PHONY: help up down build logs migrate test clean

help:
	@echo "DDE - Dominant Digital Empire Commands"
	@echo ""
	@echo "  up           : Start all services with Docker Compose"
	@echo "  down         : Stop and remove all services"
	@echo "  build        : Build or rebuild services"
	@echo "  logs         : Follow logs for all services (or specific: make logs s=backend)"
	@echo "  migrate      : Run database migrations"
	@echo "  makemigrations: Create new database migration"
	@echo "  test         : Run backend tests"
	@echo "  clean        : Clean up containers, volumes, and cache"
	@echo "  shell        : Open a shell in the backend container"

up:
	@echo "🚀 Starting DDE development environment..."
	docker-compose up -d
	@echo "✅ Services started successfully!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend API: http://localhost:8000/docs"

down:
	@echo "🛑 Stopping DDE development environment..."
	docker-compose down

build:
	@echo "🏗️  Building Docker images..."
	docker-compose build

logs:
	@echo "📜 Following logs for service: $(or $(s),all services)"
	docker-compose logs -f $(s)

migrate:
	@echo "🗄️  Running Alembic migrations..."
	docker-compose exec backend alembic upgrade head

makemigrations:
	@echo "📝 Creating new migration..."
	docker-compose exec backend alembic revision --autogenerate -m "$(m)"

test:
	@echo "🧪 Running backend tests..."
	docker-compose exec backend pytest

clean:
	@echo "🧹 Cleaning up..."
	docker-compose down -v
	rm -rf backend/__pycache__ backend/.pytest_cache
	rm -rf frontend/.next frontend/node_modules

shell:
	@echo "🐚 Opening shell in backend container..."
	docker-compose exec backend /bin/bash
