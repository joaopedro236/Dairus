from pydantic import BaseModel
class createAccountGoogleSchema(BaseModel):
    data: str
    password: str