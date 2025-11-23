from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.base import CRUDBase
from app.models.website import Website
from app.schemas.website import WebsiteCreate, WebsiteUpdate


class CRUDWebsite(CRUDBase[Website, WebsiteCreate, WebsiteUpdate]):
    """CRUD operations for Website model."""

    async def get_by_sub_tenant(
        self, db: AsyncSession, *, sub_tenant_id: str
    ) -> Website | None:
        """Get a website by sub-tenant ID."""
        result = await db.execute(
            select(Website).where(Website.sub_tenant_id == sub_tenant_id)
        )
        return result.scalar_one_or_none()

    async def get_by_domain(self, db: AsyncSession, *, domain: str) -> Website | None:
        """Get a website by primary domain."""
        result = await db.execute(
            select(Website).where(Website.primary_domain == domain)
        )
        return result.scalar_one_or_none()


website = CRUDWebsite(Website)
