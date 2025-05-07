import { useState, useEffect } from "react";
import api from "../api";
import Bar from "../components/Bar";

function About() {

    return (
        <div>
            <Bar />
            <h2>About</h2>
        </div>
    );
}

export default About;