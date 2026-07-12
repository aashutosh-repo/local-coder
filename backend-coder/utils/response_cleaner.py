class ResponseCleaner:

    @staticmethod
    def clean(text: str):

        text = text.replace("```java", "")

        text = text.replace("```", "")

        text = text.strip()

        lines = text.splitlines()

        if lines:

            return lines[0]

        return ""