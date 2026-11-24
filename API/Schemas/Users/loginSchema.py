from pydantic import BaseModel, EmailStr


class loginSchema(BaseModel):
    email: EmailStr
    password: str
