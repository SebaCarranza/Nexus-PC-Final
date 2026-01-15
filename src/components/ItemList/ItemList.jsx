import React from 'react'
import Item from '../Item/Item'


const ItemList = ({productos}) => {
  return (
    <div className="items-container">
      {productos.map(item => <Item key={item.id} {...item}/>)}
    </div>
  )
}

export default ItemList