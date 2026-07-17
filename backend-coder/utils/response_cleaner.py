import re


class ResponseCleaner:

    @staticmethod
    def clean(text: str):
        if not text:
            return ""

        cleaned = text.strip()

        if not cleaned:
            return ""

        # Remove surrounding markdown fences if present.
        cleaned = re.sub(r"^```(?:[a-zA-Z0-9_+-]+)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)

        # Remove common explanatory wrappers that the model may prepend.
        lines = [line.rstrip() for line in cleaned.splitlines() if line.strip()]
        if not lines:
            return ""

        # Keep full multi-line code, but drop a leading explanation line if it does not look like code.
        if lines and not re.search(r"[{}();]", lines[0]) and len(lines) > 1:
            lines = lines[1:]

        return "\n".join(lines).strip()