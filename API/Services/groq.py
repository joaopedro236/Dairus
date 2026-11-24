from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)


def groqResponse(prompt):
    try:
        response = client.responses.create(input=str(prompt), model="qwen/qwen3.8-27b")
        return {"response": response.output_text}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
