import io

import docx as python_docx
from utils.parsers import parse_pdf, parse_url


def _from_docx_bytes(file_bytes: bytes, max_chars: int = 6000) -> str:
    doc = python_docx.Document(io.BytesIO(file_bytes))
    text = "\n".join(p.text for p in doc.paragraphs if p.text.strip())
    if not text:
        raise ValueError("[jd_input_parser] .docx returned empty text")
    return text[:max_chars]


def parse_jd(source: str | bytes, filename: str = "") -> str:
    """
    Normalises any JD input format into plain text for jd_agent.

    Accepts:
     - URL string (http/https) -> Jina Reader fetch via parse_url()
     - PDF bytes + filename ending in .pdf -> parse_pdf()
     - .docx bytes + filename ending in .docx -> python-docx extraction

    Always returns clean plain text, max 6000 chars (enforced by parsers.py for URL/PDF).
    jd_agent never sees raw bytes or file handles.
    """
    if isinstance(source, str):
        if not (source.startswith("http://") or source.startswith("https://")):
            raise ValueError(
                f"[jd_input_parser] String input must be a URL - got: {source!r}"
            )
        print("[jd_input_parser] URL input detected")
        return parse_url(source)

    if isinstance(source, bytes):
        name = filename.lower()

        if name.endswith(".pdf"):
            print("[jd_input_parser] PDF input detected")
            return parse_pdf(source)

        if name.endswith(".docx"):
            print("[jd_input_parser] .docx input detected")
            return _from_docx_bytes(source)

        raise ValueError(
            f"[jd_input_parser] Unsupported file type: {filename!r}. Must be .pdf or .docx"
        )

    raise ValueError(
        f"[jd_input_parser] Expected a URL string or file bytes, got: {type(source)}"
    )
