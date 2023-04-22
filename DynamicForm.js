import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'

export const DynamicForm = () => {

    const [DynamicFormData, setDynamicFormData] = useState([]);
    let initformvalues = {};
    const [formvalues, setformvalues] = useState();
    const [formerrors, setformerrors] = useState({});
    let keys = [];

    useEffect(() => {
        GetFormData();
    }, [])

    const GetFormData = () => {
        axios.get("http://localhost:8400/form/GetAllForms").then(response =>{
            if(response.data.success == true){
                console.log("formdata:",response.data.data);
                setDynamicFormData(response.data.data);
            }
            else{
                setDynamicFormData([]);
            }
        })
    }

    useEffect(() => {
        if(DynamicFormData.length > 0){
            DynamicFormData.filter((x) => {
                if(x.fields.length > 0){
                    x.fields.filter((f) => {
                        initformvalues = {...initformvalues, [f.fieldname]: ""}
                    })
                }
            })
        }
        setformvalues(initformvalues)
    }, [DynamicFormData])

    useEffect(() => {
    }, [formerrors])

    const validateform = (values) => {
        const errors = {};
        // if(!values.fullname){
        //     errors.fullname = "Full Name is Required!";
        // }
        // if(!values.mobileno){
        //     errors.mobileno = "Mobile No is Required!";
        // }
        // if(!values.address){
        //     errors.address = "Address is Required!";
        // }
        // if(!values.country){
        //     errors.country = "Country is Required!";
        // }
        // if(!values.remarks){
        //     errors.remarks = "Remarks is Required!";
        // }
        return errors;
    }

    return (
        <>
        <br></br><br></br>
        <div className="row">
            <div className='col-10'>
                <br></br>
                {DynamicFormData.map((item, idx) => {
                return(
                    <div key={idx} style = {{marginLeft: 80}}>
                        {item.pageheading ? <h5 style = {{marginBottom: "20px"}}>{item.pageheading}</h5> : null}
                        {item.fields.length > 0 ? 
                            item.fields.map((data, i) => {
                                return(
                                    <div key={i} className="form-group">
                                        <label>{data.fieldname}</label>
                                        {data.type === 'input text' ? 
                                            <input type="text" className="form-control" name={data.fieldname} style={{"width": "40%"}}/>
                                        : null}
                                        
                                        {data.type === 'text area' ? 
                                            <textarea className="form-control" name={data.fieldname} style={{"width": "40%"}}/>
                                        : null}

                                        {data.type === 'radio button' ? 
                                            <div>{data.value ? data.value.length > 0 ? 
                                                data.value.map((v,ix) => {
                                                    return(
                                                        <div key={ix}>
                                                            <input type="radio" name={data.fieldname} value={v} /> {v} &nbsp; &nbsp; &nbsp;
                                                        </div>
                                                    )
                                                })
                                            : null : null}
                                            </div>
                                        : null}

                                        {data.type === 'check box' ? 
                                            <div>{data.value ? data.value.length > 0 ? 
                                                data.value.map((v,index) => {
                                                    return(
                                                        <div key={index}>
                                                            <input type="checkbox" name={data.fieldname} value={v} /> {v} &nbsp; &nbsp; &nbsp;
                                                        </div>
                                                    )
                                                })
                                            : null : null}
                                            </div>
                                        : null}

                                    </div>
                                )
                            })
                        : null}
                        <div className="form-group">
                          <button className='btn btn-success mr-2' >Submit</button>
                          <button className="btn btn-danger">Cancel</button>
                      </div>
                    </div>
                )
                })}
            </div>
        </div>
        </>
    )

}