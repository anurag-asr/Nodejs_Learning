import React, { useState } from 'react'

export const MultipleCheck = () => {
    
    const [fruit,setFruit]=useState([])

    const handleChange=(e)=>{
      const value=e.target.value;
      const checked=e.target.checked;
      console.log(value)

      if(checked){
        setFruit([...fruit,value])
      }
      else{
        setFruit(fruit.filter((e)=>(e!==value)))
      }
    }

    const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(fruit)
    }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="">Select Fruit: </label>
        <input type="radio" name="fruit" value="apple"  onChange={(e)=>handleChange(e)}/>
        <label htmlFor=''>Apple</label>
        <input type="checkbox" name="fruit" value="mango"  onChange={(e)=>handleChange(e)}/>
        <label>Mango</label>
        <input type="checkbox" name="fruit" value="banana" onChange={(e)=>handleChange(e)} />
        <label>Banana</label>
        <input type="checkbox" name="fruit" value="orange" onChange={(e)=>handleChange(e)} />
        <label>Orange</label>
        <br />


        {/* checked for providing default check in radio */}
        Gender <input type="radio" name="gender" value="male" onChange={(e)=>handleChange(e)}/>Male  
               <input type="radio" name="gender" value="female" onChange={(e)=>handleChange(e)}/>FeMale
        <br />




<select name='language' onChange={handleChange}>
    <option value="javascript">JavaScript</option>
    <option value="pyhton">Python</option>
</select>
<br />
        <input type="submit" />
    </form>
  )
}
