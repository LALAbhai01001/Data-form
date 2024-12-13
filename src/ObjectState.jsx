import React, { useState } from 'react'
import SingleData from './SingleData';
import toast from 'react-hot-toast';

const ObjectState = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    address: "",
  });

  const [formFiles, serFormFiles] = useState([])
  const [data, setData] = useState([])

  const { name, email, dob, address } = form;
//   console.log(name, email, dob, address); // Access each value individually

const handleChange = (e)=>{
  setForm({
    ...form,
    [e.target.name] : e.target.value
  })
}

const handleimagechange = (e)=>{
  // console.log(e.target.files)
  const Images = Array.from(e.target.files).map((item,index)=>{
    return item;
  })
  // console.log(Images)
  serFormFiles(Images)
}


const handleSubmit = (e)=>{
  e.preventDefault();
  if (!form.name || !form.email || !form.dob || !form.address) {
    toast.error("Please fill in all required fields.");
  } else {
    setData([...data, { ...form, formFiles, id: Date.now() }]);
    setForm({ name: "", email: "", dob: "", address: "" });

    serFormFiles([]);
    toast.success("Data successfully add")
  }
}


const handleRemove = (id)=>{
const newId = data?.filter((item,index)=>{
  return item?.id !== id
})
setData(newId)
toast.error("Remove Successfully")

}


  return (
    <>
      <div className="container col-lg-6 mx-auto p-4 my-3 shadow">
        <h2>Add Data</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={handleChange}
              type="text"
              placeholder="Enter Your Name..."
              className="form-control"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              value={email}
              onChange={handleChange}
              type="email"
              placeholder="Enter Your Email..."
              className="form-control"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input
              value={dob}
              onChange={handleChange}
              type="date"
              placeholder="Enter Your dob..."
              className="form-control"
              name="dob"
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              value={address}
              onChange={handleChange}
              type="text"
              placeholder="Enter Your Address..."
              className="form-control"
              name="address"
              required
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleimagechange}
              multiple
            />
          </div>

          {formFiles && formFiles?.length > 0 && (
            <>
              <div className="d-flex" style={{ flexWrap: "wrap" }}>
                {formFiles?.map((item, index) => {
                  return (
                    <>
                      {item?.type?.startsWith("image") && (
                        <img
                          src={URL?.createObjectURL(item)}
                          alt=" img preveiw"
                          width={100}
                          height={100}
                        />
                      )}

                      {item?.type?.startsWith("video") && (
                        <video
                          src={URL?.createObjectURL(item)}
                          controls
                          alt=" img preveiw"
                          width={100}
                          height={100}
                        ></video>
                      )}
                    </>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => serFormFiles([])}
                className="btn btn-danger my-2"
              >
                Remove All
              </button>
            </>
          )}

          <button onClick={handleSubmit} className="btn btn-success w-100 my-2">Add</button>
        </form>
      </div>

      <div className="container row mx-auto">
        {data?.map((items,index)=>{
          return <SingleData key={index} {...items} remove={handleRemove} />
        })}
      </div>
      
    </>
  );
}

export default ObjectState