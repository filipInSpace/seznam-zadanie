interface Props {
  name: string;
  count: number;
  onNameChange: (val: string) => void;
  onCountChange: (val: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ItemForm: React.FC<Props> = ({
  name,
  count,
  onNameChange,
  onCountChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className="item-form">
    <label className="form-label">Add item:</label>
    <div className="form-row">
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Item name"
        className="input"
      />
      <input
        type="number"
        value={count}
        min={1}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          onCountChange(isNaN(val) ? 1 : val);
        }}
        className="input small-input"
      />
      <button type="submit" className="btn primary-btn">
        Add
      </button>
    </div>
  </form>
);

export default ItemForm;
