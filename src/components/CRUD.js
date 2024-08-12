import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const getItemsFromLocalStorage = () => {
  const items = localStorage.getItem("items");
  return items ? JSON.parse(items) : [];
};

const saveItemsToLocalStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

function CRUD() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [items, setItems] = useState(getItemsFromLocalStorage());
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState(queryParams.get("search") || "");
  const [currentPage, setCurrentPage] = useState(Number(queryParams.get("page")) || 1);
  const itemsPerPage = 5;

  useEffect(() => {
    const filteredItems = getItemsFromLocalStorage().filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    setItems(filteredItems);
  }, [search]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newItemObj = { id: Date.now(), name: newItem };
      const currentItems = getItemsFromLocalStorage();
      currentItems.push(newItemObj);
      saveItemsToLocalStorage(currentItems);
      setNewItem("");
      setItems(currentItems);
    }
  };

  const handleDeleteItem = (id) => {
    const updatedItems = getItemsFromLocalStorage().filter((item) => item.id !== id);
    saveItemsToLocalStorage(updatedItems);
    setItems(updatedItems);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    navigate(`?search=${e.target.value}&page=${currentPage}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?search=${search}&page=${page}`);
  };

  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto p-6 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">CRUD</h1>

      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Add
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search items"
          className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <ul className="list-none mb-6">
        {paginatedItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 mb-2 rounded-lg shadow-md">
            <span className="text-gray-800 dark:text-gray-200">{item.name}</span>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Previous
        </button>
        <span className="text-gray-800 dark:text-gray-200">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={paginatedItems.length < itemsPerPage}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CRUD;
