exports.indexPage = function(concluded_tasks, to_do_tasks, task_to_edit, is_insert, is_confirmation, is_deleted, is_edited, date){
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <title>Tasks</title>
        </head>
        <body>
            <table>
                <tr>
                    <a href="/insertTask" class="w3-button w3-block w3-teal w3-border"><h2>Insert Form</h2></a>
    `

    if(is_insert){
        pagHTML += `
                <div class="w3-card-4 w3-padding">
                    <br/>
                    <form class="w3-container" method="POST">
                        <label class="w3-text-teal">Description</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="description"/>
                        <br/>
                        <label class="w3-text-teal">Who</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="who"/>
                        <br/>
                        <label class="w3-text-teal">Due date</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="duedate"/>
                        <input class="w3-input w3-border w3-light-grey" type="hidden" name="done" value="false"/>
                        <br/>
                        <center><button class="w3-btn w3-teal w3-round-large w3-border" type="submit">Submit</button></center>
                    </form>
                        <br/>
                </div>
        `
    }
    else if(is_confirmation){
        pagHTML +=`
        <div class="w3-container w3-white-smoke w3-border w3-center w3-padding">
            <h4 class="w3-center">Task inserted!</h4>
        </div>  
        `
    }
                
    
    pagHTML += `
                </tr>
                <tr>
                    <div class="w3-container w3-teal w3-center w3-padding-small">
                        <h2 class="w3-center">Edit Form</h2>
                    </div>
                </tr>
    `

    if(task_to_edit){
        pagHTML += `
            <tr>
                <div class="w3-container w3-teal w3-center w3-padding-small">
                    <h2 class="w3-center">Edit Form</h2>
                </div>
                <div class="w3-card-4 w3-padding">
                    <br/>
                    <form class="w3-container" method="POST">
                        <label class="w3-text-teal">Description</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="description" value="${task_to_edit.description}"/>
                        <br/>
                        <label class="w3-text-teal">Who</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="who" value="${task_to_edit.who}"/>
                        <br/>
                        <label class="w3-text-teal">Due date</label>
                        <input class="w3-input w3-border w3-light-grey" type="text" name="duedate" value="${task_to_edit.duedate}"/>
                        <input class="w3-input w3-border w3-light-grey" type="hidden" name="done" value="false"/>
                        <input class="w3-input w3-border w3-light-grey" type="hidden" name="id" value="${task_to_edit.id}"/>
                        <br/>
                        <center><button class="w3-btn w3-teal w3-round-large w3-border" type="submit">Submit</button></center>
                    </form>
                    <br/>
                </div>
            </tr>
        `
    }

    if(is_edited){
        pagHTML +=`
        <tr>
            <div class="w3-container w3-white-smoke w3-border w3-center w3-padding">
                <h4 class="w3-center">Task edited!</h4>
            </div>  
        </tr>
        `  
    }

    if(is_deleted){
        pagHTML += `
        <tr>
            <div class="w3-container w3-white-smoke w3-border w3-center w3-padding">
                <h4 class="w3-center">Task deleted!</h4>
            </div>  
        </tr>
        `
    }
    
    pagHTML += `
                <tr>
                    <table class="w3-padding w3-table w3-topbar w3-center w3-border-dark-gray">
                        <tr class="w3-bottombar w3-border-dark-gray">
                            <th class="w3-center w3-container w3-light-grey w3-rightbar w3-border-dark-gray" style="width:50%">To be done</th>
                            <th class="w3-center w3-container w3-light-grey w3-leftbar w3-border-dark-gray" style="width:50%">Already done</th>
                        </tr>
    `


    for(let i = 0; i < concluded_tasks.length && i < to_do_tasks.length; i++){
        console.log("entrei")
        pagHTML += `
                    <tr>
                        <td class="w3-rightbar w3-border-dark-gray">
                            ${tableCell1(concluded_tasks[i])}
                        </td>
                        <td class="w3-leftbar w3-border-dark-gray">
                            ${tableCell2(to_do_tasks[i])}
                        </td>
                    </tr>
        `
    }


    if(concluded_tasks.length > to_do_tasks.length){
        for(let i = 0; i < concluded_tasks.length-to_do_tasks.length; i++){
            pagHTML += `
                        <tr>
                            <td class="w3-rightbar w3-border-dark-gray">
                                ${tableCell1(concluded_tasks[i + to_do_tasks.length])}
                            </td>
                            <td class="w3-leftbar w3-border-dark-gray">
                                
                            </td>
                        </tr>
            `
        }
    }
    else if(to_do_tasks.length > concluded_tasks.length){
        for(let i = 0; i < to_do_tasks.length-concluded_tasks.length; i++){
            pagHTML += `
                        <tr>
                            <td class="w3-rightbar w3-border-dark-gray">
                                
                            </td>
                            <td class="w3-leftbar w3-border-dark-gray">
                                ${tableCell2(to_do_tasks[i + concluded_tasks.length])}
                            </td>
                        </tr>
            `
        }
    }


    pagHTML+=
    `
                    </table>
                </tr>
            </table>
            <footer class="w3-container w3-teal w3-center w3-padding w3-topbar w3-border-dark-gray">
                <h5>Generated by EngWeb2023 ${date}</5>
            </footer>
        </body>
    </html>
    `


    return pagHTML
}



function tableCell1(task){
    html = `
    <table class="w3-table w3-white">
        <tr>
            <th style="width:85%"></th>
            <th style="width:15%"></th>
        </tr>
        <tr>
            <td>
                <p class="w3-padding">Description : ${task.description} | Who: ${task.who} | Due date : ${task.duedate}</p>
            </td>
            <td>
                <a href="/editTask/${task.id}" class="glyphicon glyphicon-pencil w3-margin-right w3-large" style="text-decoration: none"/>      
                <a href="/deleteTask/${task.id}" class="glyphicon glyphicon-trash w3-margin-right w3-large" style="text-decoration: none"/>
                <a href="/done/${task.id}" class="glyphicon glyphicon-ok w3-large" style="text-decoration: none"/>
            </td>
        </tr>
    </table>
    `

    return html
}

function tableCell2(task){
    html = `
    <table class="w3-table w3-white">
        <tr>
            <th style="width:85%"></th>
            <th style="width:15%"></th>
        </tr>
        <tr>
            <td>
                <p class="w3-padding">Description : ${task.description} | Who: ${task.who} | Due date : ${task.duedate}</p>
            </td>
            <td>
                <a href="/editTask/${task.id}" class="glyphicon glyphicon-pencil w3-margin-right w3-large" style="text-decoration: none"/>      
                <a href="/deleteTask/${task.id}" class="glyphicon glyphicon-trash w3-margin-right w3-large" style="text-decoration: none"/>
            </td>
        </tr>
    </table>
    `

    return html
}