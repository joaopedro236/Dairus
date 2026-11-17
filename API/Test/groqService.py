from ..Services.groq import groqResponse

prompt = 'Recite the first page of the book The Metamorphosis'
response = groqResponse(prompt)
print(response)