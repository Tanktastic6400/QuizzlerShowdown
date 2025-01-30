import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';

function ErrorPage (){

    return (
        <div>
                    <h1>Woah there, pardner! Seems you got lost. Click below to get back home!</h1>
                    (<a href={`http://localhost:5173`}>
                                             Homepage
                                        </a>):
                </div>
            );
}

export default ErrorPage;