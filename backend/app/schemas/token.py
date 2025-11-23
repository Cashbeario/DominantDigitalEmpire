from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class Token(BaseModel):
    """Token response schema."""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Token payload data schema."""
    user_id: Optional[UUID] = None
    tenant_id: Optional[UUID] = None
    role: Optional[str] = None
