import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemRow from "../components/ItemRow";
import ItemForm from "../components/ItemForm";

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

const ListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [itemName, setItemName] = useState("");
  const [itemCount, setItemCount] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchList = async () => {
      try {
        const res = await fetch(`http://localhost:5000/lists/${id}`);
        if (!res.ok) throw new Error("Failed to load list.");
        const data = await res.json();
        setList(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [id]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = itemName.trim();
    if (!trimmed) {
      alert("Item name is required.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/lists/${id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, count: itemCount }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add item.");
      }

      setItemName("");
      setItemCount(1);
      // Re-fetch the updated list
      const updatedRes = await fetch(`http://localhost:5000/lists/${id}`);
      const updatedData = await updatedRes.json();
      setList(updatedData);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/lists/${id}/items/${itemId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete item.");

      // Re-fetch the updated list
      const updatedRes = await fetch(`http://localhost:5000/lists/${id}`);
      const updatedData = await updatedRes.json();
      setList(updatedData);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p className="empty-text">Loading...</p>
      </div>
    );
  }

  if (error || !list) {
    return (
      <div className="container">
        <p className="empty-text">Error: {error || "List not found."}</p>
        <button
          style={{ marginTop: "2rem" }}
          onClick={() => navigate("/")}
          className="btn"
        >
          Back to lists
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-heading">{list.name}</h1>

      <ItemForm
        name={itemName}
        count={itemCount}
        onNameChange={setItemName}
        onCountChange={setItemCount}
        onSubmit={handleAddItem}
      />

      {list.items.length === 0 ? (
        <p className="empty-text">No items yet.</p>
      ) : (
        <ul className="list-wrapper">
          {list.items.map((item) => (
            <ItemRow
              key={item.id}
              name={item.name}
              count={item.count || 1}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}
        </ul>
      )}

      <button
        style={{ marginTop: "2rem" }}
        onClick={() => navigate("/")}
        className="btn"
      >
        Back to lists
      </button>
    </div>
  );
};

export default ListDetail;
