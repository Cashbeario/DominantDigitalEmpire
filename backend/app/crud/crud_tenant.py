from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.base import CRUDBase
from app.models.tenant import Tenant
from app.schemas.tenant import TenantCreate, TenantUpdate


class CRUDTenant(CRUDBase[Tenant, TenantCreate, TenantUpdate]):
    """CRUD operations for Tenant model."""

    async def get_by_domain(self, db: AsyncSession, *, domain: str) -> Tenant | None:
        """Get a tenant by custom domain."""
        result = await db.execute(select(Tenant).where(Tenant.custom_domain == domain))
        return result.scalar_one_or_none()


tenant = CRUDTenant(Tenant)
