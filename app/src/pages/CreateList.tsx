import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateList: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      Swal.fire("Validation Error", "List name is required.", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) throw new Error("Failed to create list.");
      await Swal.fire("Success", "List created.", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", (err as Error).message, "error");
    }
  };

  return (
    <div className="container">
      <h1 className="page-heading">Create new list</h1>
      <form onSubmit={handleCreate}>
        <label className="form-label">List name:</label>
        <div className="form-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn success-btn">
            Create
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

export default CreateList;
