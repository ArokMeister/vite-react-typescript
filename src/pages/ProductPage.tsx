import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"
import { useProducts } from "../hooks/products"
import { IProduct } from "../modules"
import { Preloader } from "../components/Preloader"
import { ErrorMessage } from "../components/ErrorMessage"
import { Product } from "../components/Product"
import { Modal } from "../components/Modal"
import { CreateProduct } from "../components/CreateProduct"

export function ProductPage() {
  const { products, error, loading, addProduct } = useProducts()
  const { isOpen, open, close } = useContext(ModalContext)

  const handlerCreate = (product: IProduct) => {
    close()
    addProduct(product)
  }

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {loading && <Preloader />}
      {error && <ErrorMessage error={error} />}
      {products.map(product => 
        <Product product={product} key={product.id} />)
      }
      {isOpen && 
        <Modal onClose={close} title="Create new product">
          <CreateProduct onCreate={handlerCreate}/>
        </Modal>
      }

      <button onClick={open} className="fixed bottom-5 right-5 rounded-full bg-green-400 text-white text-2xl px-4 py-2">+</button>
    </div>
    
  )
}