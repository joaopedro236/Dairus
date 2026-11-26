from ..Services.groq import groqResponse

prompt = "Manda a primeira pagina do livro a metamorfose"
response = groqResponse(prompt)
print(response)
