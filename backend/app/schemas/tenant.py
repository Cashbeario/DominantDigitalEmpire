from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# Tenant Schemas
class TenantBase(BaseModel):
    """Base tenant schema."""
    name: str
    custom_domain: Optional[str] = None


class TenantCreate(TenantBase):
    """Schema for creating a new tenant (agency)."""
    owner_email: str
    owner_password: str
    owner_name: Optional[str] = None


class TenantUpdate(BaseModel):
    """Schema for updating a tenant."""
    name: Optional[str] = None
    custom_domain: Optional[str] = None
    branding_settings: Optional[dict] = None


class TenantResponse(TenantBase):
    """Schema for tenant responses."""
    id: UUID
    created_at: datetime
    branding_settings: Optional[dict] = None

    model_config = ConfigDict(from_attributes=True)


class Tenant(TenantResponse):
    """Full tenant schema."""
    pass


# SubTenant Schemas
class SubTenantBase(BaseModel):
    """Base sub-tenant schema."""
    name: str
    email: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None


class SubTenantCreate(SubTenantBase):
    """Schema for creating a new sub-tenant (client)."""
    create_website: bool = True
    website_template: str = "default"


class SubTenantUpdate(BaseModel):
    """Schema for updating a sub-tenant."""
    name: Optional[str] = None
    email: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None
    status: Optional[str] = None


class SubTenantResponse(SubTenantBase):
    """Schema for sub-tenant responses."""
    id: UUID
    tenant_id: UUID
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SubTenant(SubTenantResponse):
    """Full sub-tenant schema."""
    pass
