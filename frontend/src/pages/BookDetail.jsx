import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/BookDetail.css";
import Bar from "../components/Bar";

function BookDetail() {
    const { isbn } = useParams();
    const [book, setBook] = useState(null);
    const [tab, setTab] = useState("library"); // "library" or "store"
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);  // 回到上一頁
    };

    useEffect(() => {
        api.get(`/api/book/${isbn}/`)
            .then(res => setBook(res.data))
            .catch(err => alert("載入書籍資料失敗：" + err));
    }, [isbn]);

    if (!book) return <div>Loading...</div>;

    const availableCount = book.library_holdings.filter(h => h.available).length;
    const minPrice = Math.min(...book.bookstore_prices.map(p => parseFloat(p.price)));

    const recommendation = availableCount > 0
        ? "📖 建議：借閱"
        : "🛒 建議：購買";

    return (
        <div>
            <Bar />
            <div className="back-button-container">
                <button className="back-button" onClick={goBack}>← 回到上一頁</button>
            </div>
            <div className="book-detail-container">
                <div className="book-info-left">
                    <img src={book.cover_url} alt={book.title} className="book-cover" />
                    <p className="recommendation">{recommendation}</p>
                    <p className="summary">
                        {availableCount} 間圖書館可借，且書店最低價為 ${minPrice}
                    </p>
                </div>

                <div className="book-info-right">
                    <h1 className="book-title">{book.title}</h1>
                    <p className="book-meta">
                        作者：{book.author}<br />
                        ISBN：{book.isbn}<br />
                    </p>

                    <div className="tab-buttons">
                        <button className={tab === "store" ? "active" : ""} onClick={() => setTab("store")}>書店</button>
                        <button className={tab === "library" ? "active" : ""} onClick={() => setTab("library")}>圖書館</button>
                    </div>

                    {tab === "library" && (
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>圖書館名稱</th>
                                    <th>是否可借</th>
                                    <th>館藏位置</th>
                                </tr>
                            </thead>
                            <tbody>
                                {book.library_holdings.map((h, i) => (
                                    <tr key={i}>
                                        <td>{h.library_name}</td>
                                        <td style={{ color: h.available ? "green" : "red" }}>
                                            {h.available ? "✅ 可借" : "❌ 不可借"}
                                        </td>
                                        <td>{h.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {tab === "store" && (
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>書店名稱</th>
                                    <th>價格</th>
                                    <th>連結</th>
                                </tr>
                            </thead>
                            <tbody>
                                {book.bookstore_prices.map((p, i) => (
                                    <tr key={i}>
                                        <td>{p.store_name}</td>
                                        <td>${p.price}</td>
                                        <td><a href={p.url} target="_blank" rel="noreferrer">前往</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
