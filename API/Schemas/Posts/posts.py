from pydantic import BaseModel
class PostSchema(BaseModel):
    title: str
    description: str
    image_url: str | None = None