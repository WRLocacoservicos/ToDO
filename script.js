let tasks = [];



function idGenerator() {
    let timestamp = new Date();
    return timestamp.getTime();
}

function createTask() {
    
    
    let taskdesc = document.getElementById("newTask").value;

    if(taskdesc === '') return; 

    let task = {
        id: idGenerator(),
        data: {
            desc: taskdesc,
            completed: false,
            completedDate: null
        }
    }

    tasks.push(task);
    addTask(task, function(docRefId, error) {
        if (docRefId) {
            task.id = docRefId;
            updateScreen();
        } else {
            console.error(error);
        }
    });
}



function updateScreen() {
   
    
    tasks.sort((a, b) => b.id - a.id);
    let list = "<ul>";
    console.log(tasks)
    tasks.forEach(task => {
        
        list += `
        <div class="divLi">
        <li> ${task.data.desc }</li>
        </div>
        `
       
    })

    list = list + "</ul>";
   
    document.getElementById("list").innerHTML = list;
    document.getElementById("newTask").value= "";

   
}

dataWasUptaded(function (snapshot) {
    tasks = [];

    snapshot.forEach((doc) => {
        tasks.push(doc.data());
    })

    updateScreen(tasks); // Passando o array tasks como parâmetro para updateScreen
});


