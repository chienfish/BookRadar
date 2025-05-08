import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Result.css";
import Bar from "../components/Bar";

function Result() {
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
        navigate(`/result?${queryParams.toString()}`);
    };

    return (
        <div>
            <Bar />
            <div className="result-container">
                <h2 className="result-title">搜尋結果</h2>
                {books.length === 0 ? (
                    <p>找不到符合的書籍</p>
                ) : (
                    <div className="book-list">
                        {books.map((book, index) => (
                            <div className="book-card" key={index}>
                                <img src={book.cover_url} alt={book.title} className="book-image" />
                                <div className="book-info">
                                    <h3>{book.title}</h3>
                                    <p>作者：{book.author}</p>
                                    <p>內容簡介：{book.description}</p>
                                    <button className="view-more">View More</button>
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

export default Result;
