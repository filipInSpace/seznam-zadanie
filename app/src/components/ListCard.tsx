interface Props {
  name: string;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ListCard: React.FC<Props> = ({ name, onOpen, onEdit, onDelete }) => {
  return (
    <li className="list-card clickable" onClick={onOpen}>
      <span className="list-name">🛒 {name}</span>
      <div className="list-actions">
        <button
          className="btn edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </button>
        <button
          className="btn delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ListCard;
