import { useContext, useState } from "react"
import { ModalContext } from "../context/ModalContext"
import { useProducts } from "../hooks/products"
import { IProduct } from "../modules"
import { Preloader } from "../components/Preloader"
import { ErrorMessage } from "../components/ErrorMessage"
import { Product } from "../components/Product"
import { Modal } from "../components/Modal"
import { CreateProduct } from "../components/CreateProduct"

export function ProductPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { products, error, loading, addProduct, deleteProduct  } = useProducts()
  const { isOpen, open, close } = useContext(ModalContext)

  const handlerCreate = (product: IProduct) => {
    close()
    addProduct(product)
  }

  return (
    <>
      <h1 className="text-6xl text-center text-cyan-600 m-3 animate-pulse drop-shadow-xl">Mystery Shop</h1>
      <div className='grid grid-cols-3 gap-4 max-w-7xl mx-auto p-5'>
        {loading && <Preloader />}
        {error && <ErrorMessage error={error} />}
        {products.map((product, index) => 
          <Product 
            product={product} 
            key={product.id} 
            isOpen={index === openIndex}
            onToggle={() => {
              setOpenIndex(index === openIndex ? null : index) 
            }}
            onDelete={() => deleteProduct(product.id)}
          />)
        }
        {isOpen && 
          <Modal onClose={close} title="Create new product">
            <CreateProduct onCreate={handlerCreate}/>
          </Modal>
        }
        <button onClick={open} className="fixed bottom-5 right-5 rounded-full bg-green-400 text-white text-2xl px-4 py-2">+</button>
      </div>
    </>
  )
}