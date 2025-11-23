from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    full_name: Optional[str] = None
    role: str = "client"


class UserCreate(UserBase):
    """Schema for creating a new user."""
    password: str
    tenant_id: UUID
    sub_tenant_id: Optional[UUID] = None


class UserUpdate(BaseModel):
    """Schema for updating a user."""
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None


class UserResponse(UserBase):
    """Schema for user responses."""
    id: UUID
    tenant_id: UUID
    sub_tenant_id: Optional[UUID] = None
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class User(UserResponse):
    """Full user schema."""
    pass


class UserLogin(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str
