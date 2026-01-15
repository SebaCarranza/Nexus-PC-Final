const ItemCount = ({cantidad, sumar, restar, añadir}) => {

    return (
        <div>
            <div className="item-count">
                <button onClick={restar}>-</button>
                <p>{cantidad}</p>
                <button onClick={sumar}>+</button>
            </div>
            <button className="" onClick={añadir}>Agregar al carrito</button>
        </div>
    )
}

export default ItemCount