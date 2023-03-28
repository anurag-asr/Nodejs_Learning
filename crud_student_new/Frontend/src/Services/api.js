import axios from "axios"

const usersUrl = 'http://localhost:3001';


export const  getUsers=async(id)=>{
        id = id || '';
        return await axios.post(`${usersUrl}/data/${id}`)
}

export const  deleteUser=async(id)=>{
   return await axios.post(`${usersUrl}/delete/${id}`)
}      


export const addUser=async(users)=>{
       const form = new FormData()
       form.append('firstname',users.firstname)
       form.append('lastname',users.lastname)
       form.append('email',users.email)
       form.append('password',users.password)
       form.append('image',users.image)
       form.append('subname',users.subname)
       form.append('gender',users.gender)
       form.append('country',users.country);
       return await axios.post(`${usersUrl}/student`,form)
}


export const editUser = async (id, user) => {
        const form = new FormData();
        form.append('firstname',user.firstname);
        form.append('lastname',user.lastname);
        form.append('email',user.email);
        form.append('password',user.password);
        form.append('image',user.image);
        form.append('sub',user.sub);
        form.append('gender',user.gender);
        form.append('url',user.url)
        form.append('country',user.country);
        return  await axios.post(`${usersUrl}/edit/${id}`, form)
    
    }
