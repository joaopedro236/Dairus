from pydantic import BaseModel, EmailStr


class createAccountSchema(BaseModel):
    name: str
    recaptcha_token: str
    email: EmailStr
    password: str
