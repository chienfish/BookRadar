import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Home.css";
import Bar from "../components/Bar";

function Home() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        api
            .get("/api/categories/")
            .then((res) => res.data)
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => alert("分類載入失敗：" + err));
    };

    const handleSearch = () => {
        const query = encodeURIComponent(searchInput.trim());
        const categoryQuery = selectedTypes.map(t => encodeURIComponent(t)).join(',');
    
        const params = [];
        if (query) params.push(`q=${query}`);
        if (categoryQuery) params.push(`categories=${categoryQuery}`);
    
        const finalQuery = params.length ? `?${params.join("&")}` : "";
        window.location.href = `/books${finalQuery}`;
    };

    return (
        <div>
            <Bar />
            <div className="home-container">
                <h1 className="bookradar-title">BOOKRADAR</h1>

                <div className="category-buttons">
                    {categories.map((type, index) => (
                        <button
                            key={index}
                            className={`category-btn ${selectedTypes.includes(type) ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedTypes(prev =>
                                    prev.includes(type)
                                        ? prev.filter(t => t !== type)
                                        : [...prev, type]
                                );
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="search-label">輸入書名 / ISBN</div>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-icon">🔍</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
