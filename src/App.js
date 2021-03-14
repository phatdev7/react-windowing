import { useState, useEffect } from 'react';
import Windowing from './components/Windowing';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [columnsCount, setColumnsCount] = useState(15);
  const [itemWidth, setItemWidth] = useState(200);
  const [itemHeight, setItemHeight] = useState(70);
  const [totalItems, setTotalItems] = useState(1000000);

  useEffect(() => {
    const newItems = [];
    for (let i = 1; i <= totalItems; i++) {
      newItems.push({ id: i });
    }
    setItems(newItems);
  }, [totalItems])

  const onChangeColumnsCount = (e) => {
    if (e.target.value) {
      setColumnsCount(e.target.value);
    }
  }

  const onChangeItemWidth = (e) => {
    if (e.target.value) {
      setItemWidth(e.target.value);
    }
  }

  const onChangeItemHeight = (e) => {
    if (e.target.value) {
      setItemHeight(e.target.value);
    }
  }

  const onChangeTotalItems = (e) => {
    if (e.target.value) {
      setTotalItems(e.target.value);
    }
  }

  return (
    <div className='App'>
      <div className='content'>
        <div className='filter'>
          <div className='input-inline'>
            <div className='input-field'>
              <label>Item Width</label>
              <input value={itemWidth} onChange={onChangeItemWidth} />
            </div>
            <div className='input-field'>
              <label>Item Height</label>
              <input value={itemHeight} onChange={onChangeItemHeight} />
            </div>
          </div>
          <div className='input-inline'>
            <div className='input-field'>
              <label>Columns Count</label>
              <input value={columnsCount} onChange={onChangeColumnsCount} />
            </div>
            <div className='input-field'>
              <label>Total Items</label>
              <input value={totalItems} onChange={onChangeTotalItems} />
            </div>
          </div>
        </div>

        <Windowing
          items={items}
          boxWidth='100%'
          boxHeight='calc(100vh - 210px)'
          columnsCount={columnsCount}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
        >
          {Item}
        </Windowing>
      </div>
    </div>
  );
}



const Item = (item) => {
  const backgroundColor = item?.y % 2 ? '#FFAAA6' : '#FF8C94';
  return (
    <div className='item' style={{ backgroundColor }}>
      {item.id}
    </div>
  )
};

export default App;
