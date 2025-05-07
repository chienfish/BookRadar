import React from "react";
import "../styles/EyeIcon.css";

function EyeIcon({ isVisible, onClick }) {
    return (
        <span className="eye-icon" onClick={onClick}>
            {isVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M12 5C7.58 5 4 7.58 4 10s3.58 5 8 5 8-2.58 8-5-3.58-5-8-5zM12 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M12 5C7.58 5 4 7.58 4 10s3.58 5 8 5 8-2.58 8-5-3.58-5-8-5zM12 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                    <path d="M1 1l22 22"></path>
                </svg>
            )}
        </span>
    );
}

export default EyeIcon;
