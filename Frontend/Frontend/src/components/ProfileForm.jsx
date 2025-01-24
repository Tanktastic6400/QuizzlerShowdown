import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProfileForm(){

    function handleSubmit(e) {
        e.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
            <button type="submit">
                DONE
            </button>
        </form>
        );
}

export default ProfileForm;
