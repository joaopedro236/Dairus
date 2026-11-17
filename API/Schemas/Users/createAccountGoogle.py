from pydantic import BaseModel
class createAccountGoogleSchema(BaseModel):
    data: dict
    password: str