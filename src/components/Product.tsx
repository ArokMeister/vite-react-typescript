import { IProduct } from "../modules"

interface ProductProps {
  product: IProduct
  isOpen: boolean
  onToggle: () => void
  onDelete: (productId: number) => void
}

export function Product({ product, isOpen, onToggle, onDelete }: ProductProps) {
  
  const btnClassName = isOpen ? 'bg-blue-400' : 'bg-yellow-400'
  const btnClasses = ['py-2 px-4 border', btnClassName]

  return (
    <div className="container relative border py-2 px-4 rounded flex flex-col items-center justify-between shadow-md shadow-cyan-500/50">
      <button onClick={() => onDelete(product.id)} className="bg-red-500 text-white rounded py-1 px-2 mt-2">Delete</button>
      <h1>{ product.title }</h1>
      <div className="w-32 h-32 m-2 box-border flex">
        <img src={ product.image } className='object-contain' alt={ product.title }/>
      </div>
      <span className="font-bold">{ product.price } $</span>
      <button 
        className={btnClasses.join(' ')} 
        onClick={() => onToggle()}
        >
        { isOpen ? "Hide details" : "Show details"}
      </button>
        {isOpen && <div className="absolute bg-white p-2 border rounded shadow w-4/5 bottom-24 z-10">
          <p>{product.description}</p>
          <p>Rate: <span className="font-bold">{product?.rating?.rate}</span></p>
        </div>}
    </div>
  )
}