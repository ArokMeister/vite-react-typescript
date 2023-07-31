import { useState } from "react"
import { IProduct } from "../modules"

interface ProductProps {
  product: IProduct
}

export function Product({ product }: ProductProps) {
  const [details, setDetails] = useState(false)

  const btnClassName = details ? 'bg-blue-400' : 'bg-yellow-400'
  const btnClasses = ['py-2 px-4 border', btnClassName]

  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
      <h1>{ product.title }</h1>
      <img src={ product.image } className='w-1/6' alt={ product.title }/>
      <span className="font-bold">{ product.price } $</span>
      <button 
        className={btnClasses.join(' ')} 
        onClick={() => setDetails(!details)}
        >
        { details ? "Hide details" : "Show details"}
      </button>
        {details && <div>
          <p>{product.description}</p>
          <p>Rate: <span className="font-bold">{product?.rating?.rate}</span></p>
        </div>}
    </div>
  )
}