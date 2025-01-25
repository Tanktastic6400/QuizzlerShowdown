import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProfileForm(props){

    const [formBio, setFormBio] = useState (props.bio);
    const [formLocation, setFormLocation] = useState (props.location);
    //setFormBio(props.bio);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formBio);
        //console.log(type(formBio));

        console.log(props.username);

        const profileFormData =
        {
            username: props.username,
            bio: formBio,
            location: formLocation
        }

        fetch("http://localhost:8080/userservice/updateProfile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(profileFormData),
        })           //CHANGE TO JSON STRINGIFY WHEN MORE THAN ONE
        .then((response) => response.text())
        .then((data) =>
        {
            return formBio; //*Do* I need to return this/everything later?
            //setFormBio(data);
            //return data;
            //console.log(data);
            })


        //setFormBio(""); //This just for testing for now.
        //props.onEditSubmitted(formBio); //This just formBio for now for testing


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
              placeholder={formBio}
              required
                ></textarea>
            </div>

             <div>
                    <label className="form-label">
                      Location:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formLocation}
                      onChange={function (e) {
                        setFormLocation(e.target.value);
                      }}
                      placeholder={formLocation}
                      required
                    />
                  </div>



            <button type="submit">
                DONE EDITING
            </button>
        </form>
        );
}

export default ProfileForm;
