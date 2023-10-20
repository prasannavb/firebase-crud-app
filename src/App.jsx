import "./App.css"
import Form from "./form";

import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import {getDocs,collection,addDoc,doc,updateDoc,deleteDoc} from 'firebase/firestore'
const App=()=>
{

  const [formdata,Setformdata]=useState({email:'',password:''})
  const [id,Setid]=useState()
  const [user,Setuser]=useState([])
  const [add,SetAdd]=useState(false)
  const [update,Setupdate]=useState(false)
  const[Addbtn,Setaddbtn]=useState(false)
  const userref=collection(db,"users")
 


  const Fetch=async()=>
    {
        const response=await getDocs(userref)
        Setuser(response.docs.map((doc)=>({...doc.data(), id:doc.id })))
    }
  useEffect(()=>
  {
  Fetch()
  },[])

  const Add=async()=>
  {
    Setupdate(false)
    if(formdata.email==='' && formdata.password==='')
    {
      alert("Enter the details");
    }
    else if(!formdata.email.includes("@gmail.com"))
    {
      alert('Enter email id Properly')
    }
    else
    {
      await addDoc(userref,formdata);
      Fetch()
      SetAdd(false)
      Setaddbtn(false)
      
    }
  }

  const HandleChange=(e)=>
  {
    const {name,value}=e.target
    Setformdata({...formdata,[name]:value})
  }

  const Update=async()=>
  {
    
    const userdoc=doc(db,"users",id)
    if(formdata.email==='' && formdata.password==='')
    {
      alert("Enter the details");
    }
    else
    {
      
    await updateDoc(userdoc, {
      email: `${formdata.email}`,
      password:`${formdata.password}`
    });
  }
    Fetch()
    SetAdd(false)
    Setaddbtn(false)

  }

  const Updateform=(id,email,password)=>
{
  SetAdd(true)
  Setid(id)
  Setaddbtn(true)
  Setupdate(true)
  Setformdata({
    email: email,
    password: password,
  });
  
}

  const Delete=async(id)=>
  {
    const userdoc=doc(db,"users",id)
    await deleteDoc(userdoc,id)
    Fetch()

  }

  return(
    <>
    {Addbtn?(<><button className="closebtn" onClick={()=>{Setaddbtn(false),SetAdd(false),Setupdate(false)}}>Close</button></>):(<><button className="Addbtn" onClick={()=>{Setaddbtn(true),SetAdd(true),Setupdate(false)}}>Add</button></>)}
    {add?(<Form HandleChange={HandleChange} Operation={update?(Update):(Add)}  formdata={update?(formdata):('')}/>
    ):(
      <>
    <table>
      <tr>
        <th>Email</th>
        <th>Password</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      {user.map((data)=>{
        return(
            <tr key={data.id}>
              <td>{data.email}</td>
              <td>{data.password}</td>
              <td><button className="updatebtn" onClick={()=>{Updateform(data.id,data.email,data.password)}}>Update</button></td>
              <td><button className="deletebtn" onClick={()=>{Delete(data.id)}}>Delete</button></td>

            </tr>

        )
      })}
    </table>
    </>)}
    </>
  )
}

export default App;