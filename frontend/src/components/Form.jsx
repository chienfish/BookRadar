import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import EyeIcon from "./EyeIcon";
import { useUser } from "../contexts/UserContext";
import loginImage from "/login.png";
import registerImage from "/register.png";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "登入" : "註冊";
    const imageSrc = method === "login" ? loginImage : registerImage;
    const { fetchUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const viewport = document.querySelector("meta[name=viewport]");

        const isFormValid =
            username &&
            password &&
            (method === "login" || (email && confirmPassword && password === confirmPassword));

        if (!isFormValid) {
            alert("請確實輸入所有必要資訊！");
            return;
        }

        setLoading(true);

        if (method === "register" && password !== confirmPassword) {
            alert("密碼和確認密碼不一致！");
            setLoading(false);
            return;
        }

        try {
            const requestData = method === "login"
                ? { username, password }
                : { username, password, email };

            const res = await api.post(route, requestData);
            if (method === "login") {
                if (res.data?.access && res.data?.refresh) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                    await fetchUser();
                    if (viewport) {
                        viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0");
                    }
                    navigate("/");
                } else {
                    alert("登入失敗，請檢查用戶名或密碼");
                }
            } else {
                alert("註冊成功！請重新登入");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response?.status === 400 && method === "register") {
                alert("註冊失敗，該用戶名已存在");
            } else if (error.response?.status === 401 && method === "login") {
                alert("登入失敗，請檢查用戶名與密碼輸入");
            } else {
                alert("發生錯誤，請稍後再試");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container ${method}`}>
            {method === "register" && (
                <div className="image-section animate fade-slide-in">
                    <img src={imageSrc} alt="Visual" className="image" />
                </div>
            )}

            <form onSubmit={handleSubmit} className="animate fade-slide-in">
                <div className="section">
                    <h1 className="name">BookRadar</h1>
                    <h2 className="title">{name}帳號</h2>
                    <div className="input-container">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="用戶名稱"
                            className="input"
                        />
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="密碼"
                                className="input"
                            />
                            <EyeIcon
                                isVisible={showPassword}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        {method === "register" && (
                            <>
                                <div className="password-container">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="確認密碼"
                                        className="input"
                                    />
                                    <EyeIcon
                                        isVisible={showConfirmPassword}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="電子郵件"
                                    className="input"
                                />
                            </>
                        )}
                    </div>
                    {loading && <LoadingIndicator />}
                    <button className="button" type="submit">
                        {name}
                    </button>
                    <p className="footer-text">
                        {method === "login" ? (
                            <>還沒有帳號嗎？<Link to="/register">註冊</Link></>
                        ) : (
                            <>已經有帳號了嗎？<Link to="/login">登入</Link></>
                        )}
                    </p>
                </div>
            </form>

            {method === "login" && (
                <div className="image-section animate fade-slide-in">
                    <img src={imageSrc} alt="Visual" className="image" />
                </div>
            )}
        </div>
    );
}

export default Form;
