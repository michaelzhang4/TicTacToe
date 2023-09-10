
export default function Square({value,onSquareClick}) {
    return (
        <button key={value} onClick={() => onSquareClick()} className="square">{value}</button>

    )
}