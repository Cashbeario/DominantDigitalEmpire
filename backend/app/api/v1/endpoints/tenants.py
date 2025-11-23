from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID
from app.db.session import get_db
from app.schemas.tenant import SubTenantCreate, SubTenantResponse, SubTenantUpdate
from app.schemas.website import WebsiteResponse
from app.crud import crud_sub_tenant, crud_website
from app.models.user import User
from app.models.website import Website
from app.api.v1.deps import get_current_agency_user

router = APIRouter()


@router.post("/clients", response_model=SubTenantResponse, status_code=status.HTTP_201_CREATED)
async def create_client(
    *,
    db: AsyncSession = Depends(get_db),
    client_in: SubTenantCreate,
    current_user: User = Depends(get_current_agency_user)
) -> dict:
    """Create a new client (sub-tenant) for the current agency."""
    from app.models.tenant import SubTenant

    # Create sub-tenant
    client = SubTenant(
        tenant_id=current_user.tenant_id,
        name=client_in.name,
        email=client_in.email,
        company=client_in.company,
        industry=client_in.industry,
    )
    db.add(client)
    await db.flush()

    # Create website if requested
    if client_in.create_website:
        website = Website(
            sub_tenant_id=client.id,
            template_name=client_in.website_template,
            status="provisioning"
        )
        db.add(website)

    await db.commit()
    await db.refresh(client)

    return client


@router.get("/clients", response_model=List[SubTenantResponse])
async def list_clients(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_agency_user)
) -> List[dict]:
    """Get all clients for the current agency."""
    clients = await crud_sub_tenant.get_by_tenant(
        db, tenant_id=str(current_user.tenant_id), skip=skip, limit=limit
    )
    return clients


@router.get("/clients/{client_id}", response_model=SubTenantResponse)
async def get_client(
    *,
    db: AsyncSession = Depends(get_db),
    client_id: UUID,
    current_user: User = Depends(get_current_agency_user)
) -> dict:
    """Get a specific client by ID."""
    client = await crud_sub_tenant.get_by_tenant_and_id(
        db, tenant_id=str(current_user.tenant_id), sub_tenant_id=str(client_id)
    )
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client


@router.patch("/clients/{client_id}", response_model=SubTenantResponse)
async def update_client(
    *,
    db: AsyncSession = Depends(get_db),
    client_id: UUID,
    client_in: SubTenantUpdate,
    current_user: User = Depends(get_current_agency_user)
) -> dict:
    """Update a client."""
    client = await crud_sub_tenant.get_by_tenant_and_id(
        db, tenant_id=str(current_user.tenant_id), sub_tenant_id=str(client_id)
    )
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    client = await crud_sub_tenant.update(db, db_obj=client, obj_in=client_in)
    return client


@router.get("/clients/{client_id}/website", response_model=WebsiteResponse)
async def get_client_website(
    *,
    db: AsyncSession = Depends(get_db),
    client_id: UUID,
    current_user: User = Depends(get_current_agency_user)
) -> dict:
    """Get the website for a specific client."""
    # Verify client belongs to agency
    client = await crud_sub_tenant.get_by_tenant_and_id(
        db, tenant_id=str(current_user.tenant_id), sub_tenant_id=str(client_id)
    )
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    # Get website
    website = await crud_website.get_by_sub_tenant(db, sub_tenant_id=str(client_id))
    if not website:
        raise HTTPException(status_code=404, detail="Website not found")

    return website
