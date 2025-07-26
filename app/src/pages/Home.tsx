import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListCard from "../components/ListCard";
import Swal from "sweetalert2";

interface Item {
  id: string;
  name: string;
  count?: number;
}

interface ShoppingList {
  id: string;
  name: string;
  items: Item[];
}

const Home: React.FC = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await fetch("http://localhost:5000/lists");
        if (!res.ok) throw new Error("Failed to fetch lists.");
        const data = await res.json();
        setLists(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This list will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/lists/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete the list.");
      setLists((prev) => prev.filter((list) => list.id !== id));
      Swal.fire("Deleted!", "List has been removed.", "success");
    } catch (err) {
      Swal.fire("Error", (err as Error).message, "error");
    }
  };

  const handleNavigate = (path: string) => navigate(path);

  return (
    <div className="container">
      <h1 className="page-heading">Shopping Lists</h1>
      <button
        className="btn success-btn centered-btn"
        onClick={() => handleNavigate("/create")}
      >
        Create New List
      </button>

      {loading ? (
        <p className="empty-text">Loading...</p>
      ) : error ? (
        <p className="empty-text">Error: {error}</p>
      ) : lists.length === 0 ? (
        <p className="empty-text">No lists found.</p>
      ) : (
        <ul className="list-wrapper">
          {lists.map((list) => (
            <ListCard
              key={list.id}
              name={list.name}
              onOpen={() => handleNavigate(`/list/${list.id}`)}
              onEdit={() => handleNavigate(`/edit/${list.id}`)}
              onDelete={() => handleDelete(list.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
