from pydantic import BaseModel, EmailStr


class loginSchema(BaseModel):
    email: EmailStr
    password: str
    recaptcha_token: str
