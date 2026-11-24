from pydantic import BaseModel


class createAccountGoogleSchema(BaseModel):
    credential: str
    password: str
