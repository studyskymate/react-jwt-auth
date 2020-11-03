import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import TutorialService from "./TutorialService";
import { useHistory } from "react-router-dom";

const AddTodos = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [submitted, setSubmitted] = useState(false);
    let history = useHistory();

    const onSubmit = data => {
        console.log(data)
        data.username = "dinesh";
        TutorialService.create(data)
            .then(response => {
                console.log(response);
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
        history.push('/todo')
    };
    console.log(watch("example")); // watch input value by passing the name of it


    const newAddTodo = () => {
        //  setTutorial(initialTutorialState);
        setSubmitted(false);
    };

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">

                    {(submitted) ?
                        <h3>  Data Submitted Successfully</h3> : ""

                    }
                    <h2>Add Todos</h2>
                    <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                        <label>Description</label> <input type="text" className="form-control" name="description" defaultValue="test" ref={register({ required: true, maxLength: 30 })} />
                        {errors.desciption && <p className="errorP">*This field is required</p>}

                        <label>Target Date</label> <input type="date" className="form-control" name="targetDate" ref={register({ required: true })} />
                        {errors.targetdate && <p className="errorP">*This field is required</p>}

                        <input type="submit" className="btn btn-success" />
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}


export default AddTodos