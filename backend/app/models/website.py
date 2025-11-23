import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base


class Website(Base):
    """Client website model."""

    __tablename__ = "website"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sub_tenant_id = Column(UUID(as_uuid=True), ForeignKey("sub_tenant.id", ondelete="CASCADE"), nullable=False, index=True)
    primary_domain = Column(String(255), nullable=True, unique=True)
    status = Column(String(50), nullable=False, default="provisioning")  # provisioning, live, suspended, error
    container_id = Column(String(255), nullable=True)
    template_git_url = Column(String(512), nullable=True)
    template_name = Column(String(100), nullable=False, default="default")
    site_config = Column(JSON, nullable=True, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    sub_tenant = relationship("SubTenant", back_populates="websites")
