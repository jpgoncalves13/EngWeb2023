import json

f = open("dataset-extra1.json")
pessoas = json.load(f)
f.close()

for index, p in enumerate(pessoas['pessoas']):
    p['id'] = "p" + str(index)

f = open("dataset-extra1.json", "w")
json.dump(pessoas, f)
f.close()

print("adicionados " + str(index+1) + " identificadores.")