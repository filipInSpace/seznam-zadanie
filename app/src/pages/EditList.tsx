import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`http://localhost:5000/lists/${id}`);
        if (!res.ok) throw new Error("Failed to load list.");
        const data = await res.json();
        setName(data.name);
      } catch (err) {
        Swal.fire("Error", (err as Error).message, "error");
      }
    };

    if (id) fetchList();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      Swal.fire("Validation Error", "List name is required.", "warning");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/lists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!res.ok) throw new Error("Failed to update list.");
      await Swal.fire("Success", "List updated.", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", (err as Error).message, "error");
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This list will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/lists/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete list.");
      await Swal.fire("Deleted", "List has been removed.", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", (err as Error).message, "error");
    }
  };

  return (
    <div className="container">
      <h1 className="page-heading">Edit list</h1>
      <form onSubmit={handleUpdate}>
        <label className="form-label">List name:</label>
        <div className="form-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn primary-btn">
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn delete-btn"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn gray-btn"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditList;
