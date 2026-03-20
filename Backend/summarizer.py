import requests
from config import API_URL, API_KEY

if not API_KEY or not API_URL:
    raise Exception("API_KEY or API_URL missing in config.py")

def summarize_chunks(chunks):
    summaries = []

    for chunk in chunks:
        payload = {
            "prompt": (
                "Summarize the following legal text with maximum information density.\n"
                "Format:\n"
                "WHAT:\nWHO:\nIMPACT:\n"
                "Keep it concise."
            ),
            "context": chunk
        }

        headers = {
            "x-api-key": API_KEY,
            "Content-Type": "application/json"
        }

        response = requests.post(
            API_URL,
            headers=headers,
            json=payload,
            timeout=10
        )

        print("STATUS:", response.status_code)
        print("RESPONSE:", response.text)

        if response.status_code != 200:
            raise Exception(f"Summarization failed: {response.status_code}")

        result = response.json()

        try:
            summary = result["results"]["compressed_prompt"]
        except KeyError:
            print("Unexpected API response:", result)
            raise Exception("API response format error")

        summaries.append(summary)

    return summaries