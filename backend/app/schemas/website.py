from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID


class WebsiteBase(BaseModel):
    """Base website schema."""
    primary_domain: Optional[str] = None
    template_name: str = "default"


class WebsiteCreate(WebsiteBase):
    """Schema for creating a new website."""
    sub_tenant_id: UUID


class WebsiteUpdate(BaseModel):
    """Schema for updating a website."""
    primary_domain: Optional[str] = None
    status: Optional[str] = None
    site_config: Optional[dict] = None


class WebsiteResponse(WebsiteBase):
    """Schema for website responses."""
    id: UUID
    sub_tenant_id: UUID
    status: str
    created_at: datetime
    site_config: Optional[dict] = None

    model_config = ConfigDict(from_attributes=True)


class Website(WebsiteResponse):
    """Full website schema."""
    pass
