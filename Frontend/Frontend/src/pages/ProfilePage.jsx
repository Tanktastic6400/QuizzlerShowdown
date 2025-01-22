import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ProfileView from "../components/ProfileView";


function ProfilePage () {

    return (
        <div>
            <ProfileView/>
        </div>
    );
}

export default ProfilePage;