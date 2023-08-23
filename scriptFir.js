firebase.initializeApp(firebaseConfig);

const collection = "TODO"

let db = firebase.firestore();

db.settings({
    timestampInSnapshots: true
});

function addTask(task, callback) {
    db.collection(collection)
    .add(task)
    .then(function (docRef) {
        console.log("Success - Task id", docRef.id);
        callback(docRef.id);

    }).catch(function (error) {
        console.log("Error", error);
        callback(false, error);
    })
}

function dataWasUptaded(callback) {
    db.collection(collection).onSnapshot(callback);
}

function updateTaskInFirestore(task) {
    const docRef = db.collection(collection).doc(task.id);

    docRef.update({
        "data.completed": task.data.completed,
        "data.completedDate": task.data.completedDate
    }).then(function() {
        console.log("Task updated successfully in Firestore.");
    }).catch(function(error) {
        console.error("Error updating task in Firestore:", error);
    });
}


