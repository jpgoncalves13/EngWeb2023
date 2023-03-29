import json
import requests

with open('pessoas.json') as arquivo:
    dados = json.load(arquivo)

for pessoa in dados["pessoas"]:
    res = requests.post("http://localhost:7777/pessoas",json=pessoa)


