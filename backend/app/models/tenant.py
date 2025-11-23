import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base


class Tenant(Base):
    """Agency/MSP tenant model."""

    __tablename__ = "tenant"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, index=True)
    custom_domain = Column(String(255), nullable=True, unique=True)
    stripe_customer_id = Column(String(255), nullable=True, unique=True)
    branding_settings = Column(JSON, nullable=True, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    users = relationship("User", back_populates="tenant", cascade="all, delete-orphan")
    sub_tenants = relationship("SubTenant", back_populates="tenant", cascade="all, delete-orphan")


class SubTenant(Base):
    """Client sub-tenant model (Agency's clients)."""

    __tablename__ = "sub_tenant"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(UUID(as_uuid=True), ForeignKey("tenant.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=True)
    company = Column(String(255), nullable=True)
    industry = Column(String(100), nullable=True)
    status = Column(String(50), nullable=False, default="active")  # active, suspended, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    tenant = relationship("Tenant", back_populates="sub_tenants")
    websites = relationship("Website", back_populates="sub_tenant", cascade="all, delete-orphan")
