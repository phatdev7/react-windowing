import { useState, useEffect } from 'react';
import './styles.css';

const Windowing= ({
  items,
  boxWidth,
  boxHeight,
  columnsCount,
  itemWidth,
  itemHeight,
  children
}) => {
  const [rowsCount, setRowsCount] = useState(0);
  const [rowsWidth, setRowsWidth] = useState(0);
  const [rowsHeight, setRowsHeight] = useState(0);
  const [itemsByPosition, setItemsByPosition] = useState({});
  const [scopes, setScopes] = useState([]);

  useEffect(() => {
    const itemsLength = items.length;
    setRowsCount(Math.ceil(itemsLength / columnsCount));
  }, [items, columnsCount]);

  useEffect(() => {
    setRowsWidth(columnsCount * itemWidth);
    setRowsHeight(rowsCount * itemHeight);
    const newItems = {};
    for (let y = 0; y < rowsCount; y++) {
      newItems[y] = items.slice(y * columnsCount, (y + 1) * columnsCount);
    }
    setItemsByPosition(newItems);
  }, [rowsCount, itemWidth, itemHeight]);

  useEffect(() => {
    if (Object.keys(itemsByPosition).length === 0) return;

    const windowingContainerElement = document.querySelector('.windowing-container');
    const windowingContainerRect = windowingContainerElement.getBoundingClientRect();

    const startPosY = 0;
    const endPosY = startPosY + windowingContainerRect.height;
    const firstItemByPosY = Math.floor(startPosY / itemHeight);
    const lastItemByPostY = Math.ceil(endPosY / itemHeight);

    const startPosX = 0;
    const endPosX = windowingContainerRect.width;
    const firstItemByPosX = Math.floor(startPosX / itemWidth);
    const lastItemByPosX = Math.ceil(endPosX / itemWidth);

    updateScope(firstItemByPosY, lastItemByPostY, firstItemByPosX, lastItemByPosX);
  }, [itemsByPosition]);

  const updateScope = (firstItemByPosY, lastItemByPostY, firstItemByPosX, lastItemByPosX) => {
    const newScopes = [];
    for (let y = firstItemByPosY; y <= lastItemByPostY; y++) {
      if (itemsByPosition[y]) {
        newScopes.push(
          ...itemsByPosition[y]
            .map((item, index) => ({ ...item, x: index, y }))
            .filter(item => item.x >= firstItemByPosX && item.x <= lastItemByPosX),
        );
      }
    }
    setScopes(newScopes);
  }

  const onScroll = (e) => {
    const windowingContainerElement = document.querySelector('.windowing-container');
    const windowingContainerRect = windowingContainerElement.getBoundingClientRect();

    const windowingListElement = document.querySelector('.windowing-list');
    const windowingListRect = windowingListElement.getBoundingClientRect();

    const startPosY = Math.abs(windowingListRect.top - windowingContainerRect.top);
    const endPosY = startPosY + windowingContainerRect.height;
    const firstItemByPosY = Math.floor(startPosY / itemHeight);
    const lastItemByPosY = Math.ceil(endPosY / itemHeight);

    const startPosX = Math.abs(windowingListRect.left - windowingContainerRect.left);
    const endPosX = startPosX + windowingContainerRect.width;
    const firstItemByPosX = Math.floor(startPosX / itemWidth);
    const lastItemByPosX = Math.ceil(endPosX / itemWidth);

    updateScope(firstItemByPosY, lastItemByPosY, firstItemByPosX, lastItemByPosX);
  }

  return (
    <div
      className='windowing-container'
      style={{ width: boxWidth, height: boxHeight }}
      onScroll={onScroll}
    >
      <div className='windowing-list' style={{ width: `${rowsWidth}px`, height: `${rowsHeight}px`}}>
        {scopes.map(item => (
          <div
            key={item.id}
            className='item-container'
            style={{
              top: `${itemHeight * item.y}px`,
              left: `${itemWidth * item.x}px`,
              width: `${itemWidth}px`,
              height: `${itemHeight}px`
            }}
          >
            {children(item)}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Windowing;
