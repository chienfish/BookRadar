import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/Books.css";
import Bar from "../components/Bar";
import React from "react";

// 解析 HashRouter 中的 URL query string
const getHashQueryParams = () => {
    const hash = window.location.hash || "";
    const queryIndex = hash.indexOf("?");
    const search = queryIndex >= 0 ? hash.substring(queryIndex) : "";
    return new URLSearchParams(search);
};

function Books() {
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [pageParam, setPageParam] = useState(1);
    const [query, setQuery] = useState({ q: "", categories: "" });
    const [loading, setLoading] = useState(false); // loading 狀態

    const fetchResults = ({ q, categories, page }) => {
        setLoading(true);
        setBooks([]); // 清空前一頁資料，避免閃爍
        api.get(`/api/search/?q=${q}&categories=${categories}&page=${page}`)
            .then((res) => {
                setBooks(res.data.results);
                setTotalPages(Math.ceil(res.data.count / 10));
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" }); // 平滑滾動
                }, 50);
            })
            .catch((err) => {
                alert("搜尋失敗：" + err);
                setBooks([]);
            })
            .finally(() => setLoading(false));
    };

    const updateFromHash = () => {
        const queryParams = getHashQueryParams();
        const q = queryParams.get("q") || "";
        const categories = queryParams.get("categories") || "";
        const page = parseInt(queryParams.get("page")) || 1;

        setQuery({ q, categories });
        setPageParam(page);
        fetchResults({ q, categories, page });
    };

    useEffect(() => {
        updateFromHash(); // 初次進入
        window.addEventListener("hashchange", updateFromHash);
        return () => window.removeEventListener("hashchange", updateFromHash);
    }, []);

    const handlePageChange = (newPage) => {
        const queryParams = getHashQueryParams();
        queryParams.set("page", newPage);
        const newHash = `#/books?${queryParams.toString()}`;
        if (window.location.hash === newHash) {
            updateFromHash(); // hash 沒變，手動更新
        } else {
            window.location.hash = `/books?${queryParams.toString()}`;
        }
    };

    return (
        <div>
            <Bar />
            <div className="search-summary">
                {query.q && <p>🔍 搜尋關鍵字：<strong>{query.q}</strong></p>}
                {query.categories && (
                    <p>📂 分類：<strong>{decodeURIComponent(query.categories).replace(/,/g, "、")}</strong></p>
                )}
            </div>
            <div className="result-container">
                <h2 className="result-title">搜尋結果</h2>

                {loading ? (
                    <p>讀取中...</p>
                ) : books.length === 0 ? (
                    <p>找不到符合的書籍</p>
                ) : (
                    <div className="book-list">
                        {books.map((book, index) => (
                            <div className="book-card" key={index}>
                                <div className="book-image-wrapper">
                                    <img src={book.cover_url} alt={book.title} className="book-image" />
                                    <Link to={`/detail/${book.isbn}`}>
                                        <button className="view-more-overlay">查看細節</button>
                                    </Link>
                                </div>
                                <div className="book-info">
                                    <h3>{book.title}</h3>
                                    <p>作者：{book.author}</p>
                                    <p>ISBN：{book.isbn}</p>
                                    <div className="book-categories">
                                        {book.categories && book.categories.length > 0 && (
                                            <div className="tags">
                                                {[...new Set(book.categories.map(c => c.name))].map((cat, i) => (
                                                    <span key={i} className="category-tag">{cat}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="pagination">
                        {[...Array(totalPages).keys()].map((i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    className={pageParam === pageNum ? "active" : ""}
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Books;
