import React from 'react';
import SortableItem from './SortableItem'; 

import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const SortableList = ({ items, onSort }) => {
  const [orderList, setOrderList] = React.useState(items);

  const onDrop = (droppedItem, monitor) => {
    const sourceIndex = monitor.getItemIndex();
    const destinationIndex = monitor.getIndex();

    const newOrder = [...orderList];
    const [removed] = newOrder.splice(sourceIndex, 1);
    newOrder.splice(destinationIndex, 0, removed);

    setOrderList(newOrder);
    onSort(newOrder); // Pass updated order to parent component
  };

  const { isOver } = useDrop(() => ({
    accept: 'ITEM',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    backgroundColor: isOver ? 'lightblue' : 'transparent',
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={listStyle}>
        {orderList.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id}
            text={item.text}
            onSort={onSort} // Pass sorting function if needed
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default SortableList;
