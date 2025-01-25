import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProfileForm(props){

    const [formName, setFormName] = useState (props.name);
    const [formBio, setFormBio] = useState (props.bio);
    const [formLocation, setFormLocation] = useState (props.location);
    const [formOccupation, setFormOccupation] = useState(props.occupation);

    function handleSubmit(e) {

        e.preventDefault();

        const profileFormData =
        {
            username: props.username,
            name: formName,
            bio: formBio,
            location: formLocation,
            occupation: formOccupation
        }

        fetch("http://localhost:8080/userservice/updateProfile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(profileFormData),
        })           //CHANGE TO JSON STRINGIFY WHEN MORE THAN ONE?
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
                    <label className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formName}
                      onChange={function (e) {
                        setFormName(e.target.value);
                      }}
                      placeholder={formName}
                      required
                    />
                  </div>

            <div>
                <label>
                    Bio
                </label>
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

                <div>
                    <label className="form-label">
                      Occupation:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formOccupation}
                      onChange={function (e) {
                        setFormOccupation(e.target.value);
                      }}
                      placeholder={formOccupation}
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
