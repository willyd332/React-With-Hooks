import React, { useState } from 'react';


const blankData = {title:'',description:''};


function CreateMovie(props){

  // const [title,setTitle] = useState('');
  // const [description,setDescription] = useState('');

  const [data,setData] = useState(blankData)

  const handleChange = (e) => {

    // e.target.name == 'title' ?
    // setTitle(e.target.value)
    // :
    // setDescription(e.target.value)

    // still unsure how to do this with nested objects
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      props.addMovie(data)
      setData(blankData)
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>
        Movie:
        <input placeholder="title" type="text" value={data.title} name="title" onChange={handleChange}/>
      </label>
      <label>
        Description:
        <input placeholder="description" type="text" value={data.description} name="description" onChange={handleChange}/>
      </label>
      <input type="submit" />
    </form>
  );
}


export default CreateMovie;
