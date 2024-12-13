import React from 'react'

const SingleData = ({name,email,dob,address,formFiles,remove,id}) => {
  return (
    <>
    <div className="col-lg-4">
      <div className="card shadow p-3 my-3">

      <h4>Name:{name}</h4>
      <a href='/'>Email:{email}</a>
      <h4>DOB:{dob}</h4>
      <h4>Address:{address}{}</h4>


       
          {(formFiles && formFiles?.length > 0 ) && (
            <div className="d-flex gap-1" style={{flexWrap: 'wrap'}}>
              {formFiles?.map((items,index)=>{
                return (
                  <>
                    {items?.type?.startsWith("image") && (
                      <img src={URL.createObjectURL(items)} alt="pic" width={100} height={100} />
                    )}
                    {items?.type?.startsWith("video") && (
                      <video src={URL.createObjectURL(items)} width={100} height={100} controls></video>
                    )}
                  </>
                );
              })}
            </div>
          )}
        
        <button onClick={()=>remove(id)} className="btn btn-danger w-100 my-2">
          Remove
        </button>
      
      </div>
    </div>
    </>
  )
}

export default SingleData