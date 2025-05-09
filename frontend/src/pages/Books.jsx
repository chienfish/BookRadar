import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../api";
import "../styles/Books.css";
import Bar from "../components/Bar";


function Books() {
    const location = useLocation();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q") || "";
    const categories = queryParams.get("categories") || "";
    const pageParam = parseInt(queryParams.get("page")) || 1;

    useEffect(() => {
        setPage(pageParam);
        fetchResults();
    }, [location.search]);

    const fetchResults = () => {
        api.get(`/api/search/?q=${q}&categories=${categories}&page=${pageParam}`)
            .then((res) => {
                setBooks(res.data.results);
                setTotalPages(res.data.total_pages);
            })
            .catch((err) => {
                alert("搜尋失敗：" + err);
                setBooks([]);
            });
    };

    const handlePageChange = (newPage) => {
        queryParams.set("page", newPage);
        navigate(`/books?${queryParams.toString()}`);
    };

    return (
        <div>
            <Bar />
            <div className="search-summary">
                {q && <p>🔍 搜尋關鍵字：<strong>{q}</strong></p>}
                {categories && <p>📂 分類：<strong>{decodeURIComponent(categories).replace(/,/g, "、")}</strong></p>}
            </div>
            <div className="result-container">
                <h2 className="result-title">搜尋結果</h2>
                {books.length === 0 ? (
                    <p>找不到符合的書籍</p>
                ) : (
                    <div className="book-list">
                        {books.map((book, index) => (
                            <div className="book-card" key={index}>
                                <div className="book-image-wrapper">
                                    <img src={book.cover_url} alt={book.title} className="book-image" />
                                    <Link to={`/detail/${book.isbn}`}>
                                        <button className="view-more-overlay">View More</button>
                                    </Link>
                                </div>
                                <div className="book-info">
                                    <h3>{book.title}</h3>
                                    <p>作者：{book.author}</p>
                                    <p>ISBN：{book.isbn}</p>
                                    <p>內容簡介：{book.description}</p>
                                    <div className="book-categories">
                                        {book.categories && book.categories.length > 0 && (
                                            <div className="tags">
                                                {book.categories
                                                    .map(c => c.name) // 取出 name
                                                    .filter((v, i, self) => self.indexOf(v) === i)
                                                    .map((cat, i) => (
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
                                    className={page === pageNum ? "active" : ""}
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
