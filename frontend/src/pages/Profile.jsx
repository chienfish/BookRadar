import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Profile.css";
import Bar from "../components/Bar";

function Profile() {
  const [account, setAccount] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = () => {
    api
      .get("/api/user/info/")
      .then((res) => {
        console.log("Account Data:", res.data);
        setAccount(res.data);

        if (res.data.avatar) {
          setAvatarPreview(`${import.meta.env.VITE_API_URL}${res.data.avatar}`);
        } else {
          setAvatarPreview("/assets/nohead.jpg");
        }
      })
      .catch((err) => alert(err));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("新密碼確認不一致");
      return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("請填寫所有欄位");
      return;
    }

    setIsSubmitting(true);

    api
      .post("/api/user/change-password/", { old_password: oldPassword, new_password: newPassword })
      .then((res) => {
        if (res.status === 200) {
          setMessage("密碼更改成功！");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setMessage("密碼更改失敗，請檢查輸入");
        }
      })
      .catch((err) => {
        setMessage("密碼更改失敗，請檢查輸入");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      // setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    if (!avatar) {
      setMessage("請選擇圖片");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    api
      .post("/api/user/upload-avatar/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("個人圖片更新成功！");
          setAccount({ ...account, avatar: res.data.avatar });
          setAvatarPreview(`${import.meta.env.VITE_API_URL}${res.data.avatar}`);
        }
      })
      .catch((err) => {
        setMessage("個人圖片更新失敗");
      });
  };

  if (account === null) {
    return <div>載入中...</div>;
  }

  const formattedDate = new Date(account.date_joined).toLocaleDateString("zh-TW");

  return (
    <>
      <Bar />
      <div className="profile-container">
        {/* 顯示訊息 */}
        {message && <p className={`message ${message.includes("成功") ? 'success' : 'error'}`}>{message}</p>}

        <div className="profile-left">
          <h1>個人檔案</h1>
          <p><strong>ID：</strong> <span className="id-text">{account.id}</span></p>
          <p><strong>Email：</strong> <span className="id-text">{account.email}</span></p>
          <p><strong>帳號創建時間：</strong> <span className="id-text">{formattedDate}</span></p>

          <h2>變更密碼</h2>
          <form onSubmit={handlePasswordChange}>
            <label htmlFor="oldPassword">原始密碼：</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="請輸入原始密碼"
              required
            />
            <label htmlFor="newPassword">新密碼：</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="請輸入新密碼"
              required
            />
            <label htmlFor="confirmPassword">確認新密碼：</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="再次輸入新密碼"
              required
            />
            <button type="submit" disabled={isSubmitting}>變更密碼</button>
          </form>
        </div>

        <div className="profile-right">
          <img src={avatarPreview} alt="Avatar" className="avatar-img" />
          <h2>個人圖片</h2>
          <form onSubmit={handleAvatarSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <button type="submit" disabled={!avatar}>變更個人圖片</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
