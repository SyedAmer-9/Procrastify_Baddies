const API_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (userData)=>{
    try{
        const response = await fetch(`${API_URL}/auth/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(userData),
        });
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to register');

        }
        const data = await response.json();
        return data;
    }catch(error){
        throw error;
    }
}
    

export const login = async (userData)=>{
    try{
        const response = await fetch(`${API_URL}/auth/login`,{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData),
        });
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to Login');
        }

        const data = await response.json();
        return data;
    }catch(error){
        throw error;
    }
}

export const getTasks = async () =>{
    const token = localStorage.getItem('token');
    if(!token){
        return [];
    }
    try{
        const response = await fetch(`${API_URL}/tasks`,{
            headers :{
                'x-auth-token':token,
            },
        });

        if(!response.ok){
            throw new Error('Failed to fetch tasks');
        }

        return response.json();
    }catch(error){
        console.error(error);
        return [];
        
    }
}

export const addTask = async (taskText)=>{
    const token = localStorage.getItem('token');

    try{
        const response = await fetch(`${API_URL}/tasks`,{
            method :'POST',
            headers:{
                'Content-Type' : 'application/json',
                'x-auth-token' : token,
            },
            body :JSON.stringify({text:taskText}),
        });
        if(!response.ok){
            throw new Error('Failed to add task');
        }
        return response.json();
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const updateTask = async (id) =>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/tasks/${id}`,{
       method:'PUT',
       headers:{
        'x-auth-token' :token,
       } ,
    });
    if(!response.ok){
        throw new Error('Failed to update task');
    }
    return response.json();
};

export const deleteTask = async (id) =>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/tasks/${id}`,{
        method :'DELETE',
        headers:{
            'x-auth-token':token,
        },
    });

    if(!response.ok){
        throw new Error('Failed to delete task');
    }
    return response.json();
}