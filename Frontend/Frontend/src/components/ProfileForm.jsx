import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/FriendProfileDisplay.css"

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
        })
        .then((response) => response.text())
        .then((data) =>
        {
            props.onEditSubmitted(data);
            return formBio; //*Do* I need to return this/everything later?
            })
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className='userProfile-container'>
            <ul>
                <div>
                    <label className="form-label">
                      Name
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
                    <label className="form-label">
                      Location
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
                      Occupation
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


            <button type="submit" className="search-button">
                DONE EDITING
            </button>
            </ul>

            </div>

            <div className="bio-container">
                            <ul>

                                <label>
                                    <h2>User Biography</h2>
                                </label>

                                <textarea
                                className="bio-text-area"
                                value={formBio}
                                onChange={function (e) {
                                    setFormBio(e.target.value);
                                  }}
                              placeholder={formBio}
                              required
                                ></textarea>
                                </ul>
                </div>

        </form>
        );
}

export default ProfileForm;
