from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.base import CRUDBase
from app.models.tenant import SubTenant
from app.schemas.tenant import SubTenantCreate, SubTenantUpdate


class CRUDSubTenant(CRUDBase[SubTenant, SubTenantCreate, SubTenantUpdate]):
    """CRUD operations for SubTenant model."""

    async def get_by_tenant(
        self, db: AsyncSession, *, tenant_id: str, skip: int = 0, limit: int = 100
    ) -> list[SubTenant]:
        """Get all sub-tenants for a specific tenant."""
        result = await db.execute(
            select(SubTenant)
            .where(SubTenant.tenant_id == tenant_id)
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    async def get_by_tenant_and_id(
        self, db: AsyncSession, *, tenant_id: str, sub_tenant_id: str
    ) -> SubTenant | None:
        """Get a specific sub-tenant by tenant and sub-tenant ID."""
        result = await db.execute(
            select(SubTenant)
            .where(SubTenant.tenant_id == tenant_id, SubTenant.id == sub_tenant_id)
        )
        return result.scalar_one_or_none()


sub_tenant = CRUDSubTenant(SubTenant)
