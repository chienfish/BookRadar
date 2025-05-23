import Form from "../components/Form"
import React from "react";


function Register() {
    return <Form route="/api/user/register/" method="register" />
}

export default Register