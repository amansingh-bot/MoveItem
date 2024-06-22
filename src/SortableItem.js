import { useDrag } from 'react-dnd';

const SortableItem = ({ id, text, onSort }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ITEM',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={dragRef} style={{ opacity }}>
      <p>{text}</p>
      {/* Add event handler for custom actions if needed */}
      <button onClick={() => onSort(id)}>Move Item</button>
    </div>
  );
};

export default SortableItem;
