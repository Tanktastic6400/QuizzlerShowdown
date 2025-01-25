import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProfileForm(props){

    const [formBio, setFormBio] = useState ("")

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formBio);
        //setFormBio(""); //This just for testing for now.
        props.onEditSubmitted(formBio); //This just formBio for now for testing
    }

    return(
        <form onSubmit={handleSubmit}>

            <div>
                <textarea
                className="form-control"
                value={formBio}
                onChange={function (e) {
                    setFormBio(e.target.value);
                  }}
              placeholder="Write a little about yourself"
              required
                ></textarea>
            </div>




            <button type="submit">
                DONE EDITING
            </button>
        </form>
        );
}

export default ProfileForm;
