# DDE Architecture Overview

## System Architecture

The Dominant Digital Empire (DDE) platform is built as a modern, scalable multi-tenant SaaS application using a modular architecture.

### High-Level Components

```
┌─────────────────────────────────────────────────────────────┐
│                      User's Browser                          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│             Next.js Frontend (Port 3000)                     │
│  ┌────────────┬────────────┬─────────────────────────────┐ │
│  │ Landing    │ Auth Pages │ Dashboard (Agency/Client)   │ │
│  │ Pages      │            │                              │ │
│  └────────────┴────────────┴─────────────────────────────┘ │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP/REST API
                 ▼
┌─────────────────────────────────────────────────────────────┐
│             FastAPI Backend (Port 8000)                      │
│  ┌────────────┬────────────┬─────────────────────────────┐ │
│  │ Auth       │ Tenants    │ Websites                    │ │
│  │ Service    │ Service    │ Service                     │ │
│  └────────────┴────────────┴─────────────────────────────┘ │
└────────────────┬────────────────────────────────────────────┘
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│   PostgreSQL    │ │     Redis       │
│   (Port 5432)   │ │   (Port 6379)   │
│                 │ │                 │
│ Multi-tenant    │ │ Cache & Queue   │
│ Data Store      │ │                 │
└─────────────────┘ └─────────────────┘
```

## Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.12)
- **Database**: PostgreSQL 15 with asyncpg
- **ORM**: SQLAlchemy 2.0 (async)
- **Migrations**: Alembic
- **Authentication**: JWT with python-jose
- **Password Hashing**: bcrypt via passlib
- **Caching**: Redis
- **Validation**: Pydantic v2

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Forms**: Native HTML5 with React hooks

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL 15
- **Cache**: Redis 7

## Database Schema

### Core Tables

#### tenants
- `id` (UUID, PK)
- `name` (VARCHAR)
- `custom_domain` (VARCHAR, unique)
- `stripe_customer_id` (VARCHAR, unique)
- `branding_settings` (JSON)
- `created_at`, `updated_at` (TIMESTAMP)

#### sub_tenants (Clients)
- `id` (UUID, PK)
- `tenant_id` (UUID, FK → tenants)
- `name` (VARCHAR)
- `email` (VARCHAR)
- `company` (VARCHAR)
- `industry` (VARCHAR)
- `status` (VARCHAR)
- `created_at`, `updated_at` (TIMESTAMP)

#### users
- `id` (UUID, PK)
- `email` (VARCHAR, unique)
- `hashed_password` (VARCHAR)
- `full_name` (VARCHAR)
- `role` (VARCHAR) - admin, agency, client
- `is_active` (BOOLEAN)
- `tenant_id` (UUID, FK → tenants)
- `sub_tenant_id` (UUID, FK → sub_tenants, nullable)
- `created_at`, `updated_at` (TIMESTAMP)

#### websites
- `id` (UUID, PK)
- `sub_tenant_id` (UUID, FK → sub_tenants)
- `primary_domain` (VARCHAR, unique)
- `status` (VARCHAR) - provisioning, live, suspended
- `container_id` (VARCHAR)
- `template_name` (VARCHAR)
- `site_config` (JSON)
- `created_at`, `updated_at` (TIMESTAMP)

## Multi-Tenancy Strategy

### Data Isolation
- **Row-Level Security**: All tenant-specific tables include `tenant_id`
- **Query Filtering**: Every database query includes tenant context
- **API Authorization**: JWT tokens contain tenant information
- **Sub-Tenant Scoping**: Clients are scoped to their parent agency

### Tenant Hierarchy
```
Platform
  └── Tenant (Agency)
        ├── User (Agency Admin)
        ├── User (Agency Member)
        └── Sub-Tenant (Client)
              ├── User (Client User)
              └── Website
```

## Authentication Flow

1. User submits credentials to `/api/v1/auth/login`
2. Backend validates credentials
3. JWT token generated with payload:
   - `sub`: user_id
   - `tenant_id`: agency/tenant ID
   - `role`: user role (admin/agency/client)
   - `exp`: expiration time
4. Token returned to client
5. Client stores token (localStorage)
6. Token included in all subsequent requests via Authorization header
7. Backend validates and extracts tenant context from token

## API Architecture

### Endpoint Structure
```
/api/v1/
  ├── /auth
  │   ├── POST /register    (Create agency + owner)
  │   ├── POST /login       (Authenticate user)
  │   └── GET  /me          (Get current user)
  └── /tenants
      ├── POST   /clients            (Create client)
      ├── GET    /clients            (List clients)
      ├── GET    /clients/{id}       (Get client)
      ├── PATCH  /clients/{id}       (Update client)
      └── GET    /clients/{id}/website (Get client website)
```

### Authentication Middleware
```python
Token → OAuth2PasswordBearer → JWT Decode → User Lookup → Role Check
```

## Frontend Architecture

### Route Structure
```
/                          (Landing page)
├── /login                 (Auth: Login)
├── /register              (Auth: Register agency)
├── /agency
│   ├── /dashboard         (Agency: Overview)
│   ├── /clients           (Agency: Client management)
│   └── /settings          (Agency: Settings)
└── /client
    ├── /dashboard         (Client: Overview)
    ├── /website           (Client: Website management)
    └── /settings          (Client: Settings)
```

### Component Architecture
- **Pages**: Server/Client components in `app/` directory
- **UI Components**: Reusable components in `components/ui/`
- **Layouts**: Shared layouts for auth and dashboard
- **Utilities**: Helper functions in `lib/`

## Security Measures

1. **Password Security**
   - bcrypt hashing
   - Salt rounds: 12 (default)

2. **JWT Security**
   - HS256 algorithm
   - 60-minute expiration
   - Secure secret key

3. **Database Security**
   - Tenant isolation at row level
   - Prepared statements (SQLAlchemy)
   - Connection pooling

4. **API Security**
   - CORS configuration
   - Rate limiting (future)
   - Input validation (Pydantic)

## Scalability Considerations

### Current Architecture
- Single PostgreSQL instance
- Single Redis instance
- Containerized services

### Future Enhancements
1. **Horizontal Scaling**
   - Multiple backend instances
   - Load balancing
   - Database read replicas

2. **Caching Strategy**
   - Redis for session storage
   - Query result caching
   - CDN for static assets

3. **Database Optimization**
   - Composite indexes for tenant queries
   - Connection pooling
   - Query optimization

## Development Workflow

1. **Local Development**
   ```bash
   make up          # Start all services
   make migrate     # Run migrations
   make logs        # View logs
   ```

2. **Making Changes**
   - Backend: Edit files in `backend/app/`
   - Frontend: Edit files in `frontend/app/` or `frontend/components/`
   - Auto-reload enabled for both

3. **Database Changes**
   ```bash
   make makemigrations m="description"  # Create migration
   make migrate                          # Apply migration
   ```

4. **Testing**
   ```bash
   make test        # Run backend tests
   ```

## Performance Targets

- **API Response Time**: < 150ms (p95)
- **Page Load Time**: < 2s (LCP)
- **Database Queries**: < 50ms average
- **Concurrent Users**: 1000+ per instance

## Monitoring & Observability

### Planned Integrations
- Prometheus for metrics
- Grafana for visualization
- Sentry for error tracking
- CloudWatch/DataDog for infrastructure

## Future Roadmap

### Phase 2 Features
- CRM module (Contacts, Deals, Pipelines)
- Marketing automation
- Email campaigns
- Project management
- Advanced analytics

### Phase 3 Features
- AI content generation
- E-commerce module
- SEO toolkit
- Template marketplace
- Mobile apps

---

This architecture is designed to be modular, scalable, and maintainable while providing excellent performance and security for multi-tenant SaaS operations.
