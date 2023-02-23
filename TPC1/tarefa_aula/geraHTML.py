import json

def ordCidade(cidade):
    return cidade["nome"]


f = open("mapa.json")

mapa = json.load(f)

cidades = mapa["cidades"]
cidades.sort(key=ordCidade)

ligacoes = mapa["ligações"]

cidades_aux = dict()

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <!-- Índice-->
                <td valign="top" width=30%>
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <ul>
"""

for c in cidades:
    cidades_aux[c["id"]] = c
    pagHTML += f"""
    <li>
        <a href="#{c["id"]}">{c["nome"]}</a>
    </li>
    """

pagHTML += """
                    </ul>
                </td>
                <!-- Conteudo-->
                <td>
"""

for c in cidades:
    pagHTML += f"""
                    <a name="{c["id"]}"/>
                    <h3>{c["nome"]}</h3>
                    <p><b>População: </b>{c["população"]}</p>
                    <p><b>Descricção: </b>{c["descrição"]}</p>
                    <p><b>Distrito: </b>{c["distrito"]}</p>
                    <p><b>Ligações: </b>
                        <ul>
        """

    for l in ligacoes:
        if l["origem"] == c["id"]:
            pagHTML += f"""
                                <li>
                                    <a href="#{l["destino"]}">{cidades_aux[l["destino"]]["nome"]}</a> - {l["distância"]} km
                                </li>
            """
        elif l["destino"] == c["id"]:
            pagHTML += f"""
                                <li>
                                    <a href="#{l["origem"]}">{cidades_aux[l["origem"]]["nome"]}</a> - {l["distância"]} km
                                </li>
            """

    pagHTML += """
                        </ul>
                    </p>
                    <address>[<a href="#indice">Voltar ao indice</a>]
                    <center>
                        <hr width="80%"/>
                    </center>
        """

pagHTML += """      
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)