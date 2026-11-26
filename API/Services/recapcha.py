import os
import httpx


async def verify_recaptcha(token: str, expected_action: str):
    secret_key = os.getenv("RECAPTCHA_SECRET_KEY")

    if not secret_key or not token:
        return {'Status': False}

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                "https://www.google.com/recaptcha/api/siteverify",
                data={
                    "secret": secret_key,
                    "response": token
                }
            )

            response.raise_for_status()
            data = response.json()

        return (
            data.get("success") is True
            and data.get("action") == expected_action
            and data.get("score", 0) >= 0.5
        )

    except (httpx.HTTPError, ValueError):
        return {'Status': False}
     