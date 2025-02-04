from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
from models import User, Tag as ORMTag  # Import ORM models from models.py
from database import get_db, SessionLocal
from auth import authenticate_user, create_access_token, get_current_user
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String
from database import Base
from auth import get_password_hash


app = FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify a list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)
# OAuth2 scheme for token-based authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Pydantic model for data validation (this does not interact with the database)
class Tag(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True  # Tells Pydantic to treat ORM models as dictionaries

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class TagResponse(TagBase):
    id: int

    class Config:
        from_attributes = True  # FastAPI now uses 'from_attributes' instead of 'orm_mode'

@app.post("/signup")
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}


@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.post("/tags/", response_model=TagResponse)
async def create_tag(tag: TagCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_tag = ORMTag(name=tag.name, user_id=current_user.id)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

@app.get("/tags/", response_model=List[TagResponse])
async def read_tags(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    tags = db.query(ORMTag).filter(ORMTag.user_id == current_user.id).all()
    return tags

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
