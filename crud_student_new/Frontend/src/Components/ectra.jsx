import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';


function Register() {
    const navigate = useNavigate();
     const [inpVal, setInp] = useState({
        name: "" ,
        email: "" ,
        contact: "" ,
        age: "" ,
        qualification: "" ,
        dob: "" ,
        gender: "" ,
        address: "" ,
        country: "" ,
        image: ""
     })

    const  setData = (e)=>{
       setInp({...inpVal , [e.target.name] : e.target.value})
       console.log(inpVal);
    }

    const imageinput = (e)=>{
        console.log(e.target.files[0]);
        setInp({...inpVal , image:e.target.files[0]})
    
    }

  
    const addInputData = async () => {
       
        const {
            name,
            email,
            contact,
            age,
            qualification,
            dob,
            gender,
            address,
            country,
            image
        } = inpVal;

        let formdata = new FormData();
        
        formdata.append("name",inpVal.name)
        formdata.append("email",inpVal.email)
        formdata.append("contact",inpVal.contact)
        formdata.append("age",inpVal.age)
        formdata.append("qualification",inpVal.qualification)
        formdata.append("dob",inpVal.dob)
        formdata.append("gender",inpVal.gender)
        formdata.append("address",inpVal.address)
        formdata.append("country",inpVal.country)
        formdata.append("image",inpVal.image)

       const response = await axios.post("http://localhost:8000/store",formdata)
       console.log(response);
        return <Navigate replace to="/" />;
    }

    return (
        <div className="container">
            <Link to={"/"}>Home</Link>
            <form className='mt-5'>
                <div className="row">

                    <div className="mb-3 col-lg-6 col-md-6 col-12 col-lg-6">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' onChange={setData}   id="name" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input type="email" name='email' className="form-control" id="email" onChange={setData} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6  col-12">
                        <label for="Contact" className="form-label">Contact</label>
                        <input type="number" name='contact'  className="form-control" id="contact"  onChange={setData}/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="Age" className="form-label">Age</label>
                        <input type="number" name='age'  className="form-control" id="age" onChange={setData}/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6  col-12">
                        <label htmlFor="Qualification" className="form-label">Qualification</label>
                        <div class="col-md-9 pe-5">

                            <input type="checkbox" name="qualification"   value='S.S.C' onChange={setData} /> S.S.C <br />
                            <input type="checkbox" name="qualification"   value='H.S.C' onChange={setData}/> H.S.C <br />
                            <input type="checkbox" name="qualification"    value='BCA' onChange={setData} /> BCA <br />
                            <input type="checkbox" name="qualification"   value='ENGINEERING' onChange={setData}/> ENGINEERING

                        </div>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6  col-12">
                        <label htmlFor="dob" className="form-label">DOB</label>
                        <input type="date"   name='dob'  className="form-control" id="dob" onChange={setData}/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6  col-12">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <div className="col-md-9 pe-5">

                            <input type="radio" id="gender" name="gender"  value="Male"  onChange={setData}/> Male
                           <br />
                                <input type="radio" id="gender" name="gender"  value="Female"  onChange={setData}/> Female <br />

                        </div>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6  col-12">
                        <label htmlFor="address" className="form-label">Enter Your Address</label>
                        <textarea class="form-control" name="address" rows="3"
                       placeholder="Please Enter Your Address" onChange={setData}></textarea>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6  col-12">
                        <label htmlFor="country" className="form-label">Select Country </label> &nbsp;
                        <select className="select" name="country"  onChange={setData}>
                      <option   value="USA">USA</option>
                      <option  value="INDIA">INDIA</option>
                      <option   value="AUS">AUS</option>
                      <option  value="CANEDA">CANEDA</option>

                    </select>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6  col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Upload Image</label>
                        <input type="file" onChange={(e)=>{imageinput(e)}} className="form-control form-control-lg" name="image" />
                    </div>
                    
                  
                    <button type="button" onClick={()=>addInputData()} className="btn btn-primary">Submit</button>
                    
                </div>
            </form>
        </div>
    )
}

export default Register