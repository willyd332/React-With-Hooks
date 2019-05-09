import React from 'react';


function EditMovie(props){
  return(
    <div>
      <h2> Edit Movie</h2>
      <form onSubmit={props.closeAndEdit}>
        <label>
          Edit Movie:
          <input type="text" name="title" onChange={props.handleFormChange} value={props.movieToEdit.title}/>
        </label>
        <label>
          Edit Description:
          <input type="text" name="description" onChange={props.handleFormChange} value={props.movieToEdit.description}/>
        </label>
        <input type='Submit'/>
      </form>
    </div>
  );
}

export default EditMovie;
