from openai import OpenAI
import os

groq = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

openrouter = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def call_llm(
    messages: list,
    model_groq="llama-3.3-70b-versatile",
    model_or="meta-llama/llama-3.3-70b-instruct:free",
    temperature: float = 0.2,
) -> str:
    try:
        resp = groq.chat.completions.create(
            model=model_groq,
            messages=messages,
            temperature=temperature,
        )
        return resp.choices[0].message.content
    except Exception as e:
        err = str(e).lower()
        if "429" in str(e) or "rate" in err or "limit" in err:
            print("[llm_router] Groq rate-limited - falling back to OpenRouter")
        else:
            print(f"[llm_router] Groq error ({e}) - falling back to OpenRouter")

        resp = openrouter.chat.completions.create(
            model=model_or,
            messages=messages,
            temperature=temperature,
        )
        return resp.choices[0].message.content
