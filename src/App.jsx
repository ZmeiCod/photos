import "./index.css";
import Collection from "./Collection.jsx";
import array from "./data.json";
import { useState } from "react";
import { useEffect } from "react";

// Категорию в колекциях нужно передовать не числом, именем категории

export default function App() {
  const [categoryId, setСategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Имитация загрузки данных (например, асинхронный запрос к API)
    const loadCollections = () => {
      setCollections(array.collections);
      setIsLoading(false); // Убедитесь, что вы устанавливаете loading в false после загрузки
    };
    
    loadCollections();
  }, []);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {array.categories.map((obj, index) => (
            <li
              onClick={() => setСategoryId(index)}
              className={categoryId === index ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2> Loading... </h2>
        ) : (
          collections
            .filter((obj) => {
              // Сначала фильтруем по категории
              const matchesCategory =
                categoryId === 0 || obj.category === categoryId;
              // Затем фильтруем по поисковому запросу
              const matchesSearch = obj.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
              return matchesCategory && matchesSearch;
            })
            .map((obj) => (
              <Collection key={obj.name} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}
