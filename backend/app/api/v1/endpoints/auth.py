from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.config import settings
from app.core.security import create_access_token
from app.schemas.token import Token
from app.schemas.user import UserLogin, UserResponse
from app.schemas.tenant import TenantCreate, TenantResponse
from app.crud import crud_user, crud_tenant
from app.models.user import User
from app.api.v1.deps import get_current_active_user

router = APIRouter()


@router.post("/register", response_model=TenantResponse, status_code=status.HTTP_201_CREATED)
async def register_agency(
    *,
    db: AsyncSession = Depends(get_db),
    tenant_in: TenantCreate
) -> dict:
    """Register a new agency (tenant) with owner account."""
    # Check if user already exists
    user = await crud_user.get_by_email(db, email=tenant_in.owner_email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    # Create tenant
    from app.models.tenant import Tenant
    tenant = Tenant(
        name=tenant_in.name,
        custom_domain=tenant_in.custom_domain,
    )
    db.add(tenant)
    await db.flush()

    # Create owner user
    from app.schemas.user import UserCreate
    user_in = UserCreate(
        email=tenant_in.owner_email,
        password=tenant_in.owner_password,
        full_name=tenant_in.owner_name,
        role="agency",
        tenant_id=tenant.id,
    )
    await crud_user.create(db, obj_in=user_in)
    await db.commit()
    await db.refresh(tenant)

    return tenant


@router.post("/login", response_model=Token)
async def login(
    db: AsyncSession = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> dict:
    """OAuth2 compatible token login."""
    user = await crud_user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "tenant_id": str(user.tenant_id),
            "role": user.role
        },
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
async def read_users_me(
    current_user: User = Depends(get_current_active_user),
) -> User:
    """Get current user information."""
    return current_user
