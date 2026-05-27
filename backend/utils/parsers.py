import httpx
import fitz

JINA_BASE= "https://r.jina.ai"

HEADERS = {
    "User-Agent": "Mozzila/5.0",
    "Accept": "text/plain"
}

def parse_url(url:str, max_chars: int = 6000) -> str:
    """
    Fetch any job posting URL via Jina Reader. 
    Returns clean markdown text- handles JS-rendered pages,LinkedIn, Greenhouse, Internshala, Indeed, WellFound, lever etc.
    """

    jina_url = f"{JINA_BASE}{url}"
    try:
        resp = httpx.get(jina_url, headers = HEADERS, timeout = 20)
        resp.raise_for_status()
    except httpx.HTTPStatusError as e:
        raise ValueError(f"Failed to fetch URL ({e.response.status_code}): {url}")
    except httpx.RequestError as e:
        raise ValueError(f"Request error for {url} : {e}")

    text = resp.text.strip()

    if len(text)<200:
        raise ValueError(
            "Page returned too little content."
            "If may require login or is behind a paywall"
        )
    return text[:max_chars]

def parse_pdf(file_bytes: bytes, max_chars: int = 6000) -> str:
    """ 
    Extrac text from a resume PDF. Returns clean plaintext, page by page. 
    """
    try:
        doc = fitz.open(stream= file_bytes, filetype="pdf")
    except Exception as e:
        raise ValueError(f"Could not open PDF: {e}")

    pages = []
    for page in doc:
        pages.append(page.get_text())
    text = "\n".join(pages).strip()

    if len(text) <100:
        raise ValueError(
            "PDF appears to be scanner image-based - "
            "no extractable text found"
        )
    return text[:max_chars]