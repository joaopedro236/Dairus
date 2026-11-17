from pydantic import BaseModel,EmailStr
class createAccountSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    