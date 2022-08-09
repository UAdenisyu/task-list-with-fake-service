

export default class TaskService {

    baseUrl = 'http://localhost:3003/posts';
    
    postTask = async newTask => {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask)
        })
        return response;
    }
    
    getTaskList = async () => {
        const result = await fetch(this.baseUrl, {
            method: 'GET',
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            }
          })
        .then(res => res.text())
        .then(res => JSON.parse(res))
        .catch(err => {
            throw new Error("GET request failed: ", err);
        });

        return result;
    }

    deleteTask = async taskId => {
        const response = await fetch(this.baseUrl + `/${taskId}`, {
            method: 'DELETE'
        });
        return response;
    };

    updateTask = async task => {
        const response = await fetch(this.baseUrl + `/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({...task, done: !task.done}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        return response;
    };

};