interface Props {
  name: string;
  count: number;
  onDelete: () => void;
}

const ItemRow: React.FC<Props> = ({ name, count, onDelete }) => (
  <li className="item-row">
    <span className="item-name">
      {count}× {name}
    </span>
    <button
      className="btn delete-btn"
      onClick={onDelete}
      aria-label={`Remove ${name}`}
    >
      Remove
    </button>
  </li>
);

export default ItemRow;
