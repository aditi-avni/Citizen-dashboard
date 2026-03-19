from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")

def summarize_chunks(chunks):
    summaries = []
    for chunk in chunks:
        prompt = f"""
        Summarize the following legal text in high information density.
        Give output in format:
        WHAT:
        WHO:
        IMPACT:

        TEXT:
        {chunk}
        """
        response = llm.predict(prompt)
        summaries.append(response)
    return summaries