// mypages.js
// 2023-03-03 by gui
// HTML templates generating function

exports.genMainPage = function(lista, data){
    var pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Lista de pessoas</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>

                        <th>Nome</th>

                        <th>Idade</th>

                        <th>Sexo</th>

                        <th>Cidade</th>

                        <th>Desportos Praticados</th>

                        <th>Profissão</th>
                    </tr>

                `

    for(let i = 0; i < lista.length; i++){
        pagHTML += `
        <tr>
            <td>
                <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
            </td>
            <td>${lista[i].idade}</td>

            <td>${lista[i].sexo}</td>

            <td>${lista[i].morada.cidade}</td>

            <td>${lista[i].desportos}</td>

            <td>${lista[i].profissao}</td>
        </tr>
        `

    }

    pagHTML += `
                    </table>
                </div>

                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${data}</h5>
                    </footer>

                </div>
            </body>
        </html>
        `

    return pagHTML
}

exports.genPersonPage = function(p, d){
    var pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>${p.nome}</h1>
                </header>
            <div class"container">
            <table class="w3-table-all">
                    <tr>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                        <th>Desportos</th>
                        <th>Profissão</th>
                    </tr>
                    <tr>
                        <td>${p.idade}</td>
                        <td>${p.sexo}</td>
                        <td>${p.morada.cidade}</td>
                        <td>${p.desportos}</td>
                        <td>${p.profissao}</td>
                    </tr>
                </table>

            </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                 </footer>

            </div>
    </body>
    </html>

        `
    return pagHTML
}

exports.genDistSexPage = function(dist, d, ref){
    pagHTML =`
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Distribuição de Género</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>

        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Distribuição de Género</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Sexo</th>
                            <th>Frequência</th>
                        </tr>
    `
    for(let genre in dist){
        pagHTML += `
        <tr>
            <td>
            ${genre}
            </td>

            <td>
            <a href="/${ref}/${genre}">${dist[genre]}</a>
            </td>
        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>

            </div>
        </body>
    </html>
    `

    return pagHTML
}

exports.genDistSport = function(dist, d, ref){
    pagHTML =`
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Distribuição de Desporto</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>

        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Distribuição de Desporto</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th>
                            <th>Frequência</th>
                        </tr>
    `
    var keys = Object.keys(dist).sort()
    for(let i = 0; i < keys.length; i++){
        pagHTML += `
        <tr>
            <td>
            ${keys[i]}
            </td>

            <td>
            <a href="/${ref}/${keys[i]}">${dist[keys[i]]}</a>
            </td>
        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>

            </div>
        </body>
    </html>
    `

    return pagHTML
}

exports.genDistProfissao = function(dist, d, ref) {
    pagHTML =`
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Top 10 Profissões</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>

        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Top 10 Profissões</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th>
                            <th>Frequência</th>
                        </tr>
    `
    var values = Object.entries(dist).sort((a, b) => b[1] - a[1]).reduce((acc, [chave, valor]) => ({ ...acc, [chave]: valor }), {})
    
    let top10 = Object.fromEntries(Object.entries(values).slice(0,10))

    for(let key in top10){

        pagHTML += `
        <tr>
            <td>
            ${key}
            </td>

            <td>
            <a href="/${ref}/${key}">${top10[key]}</a>
            </td>
        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>

            </div>
        </body>
    </html>
    `

    return pagHTML
}

