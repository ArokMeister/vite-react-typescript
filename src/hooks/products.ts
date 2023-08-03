import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IProduct } from "../modules"

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addProduct(product: IProduct) {
    setProducts(prev => [...prev, product])
  }

  async function getProducts() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products')
      setProducts(response.data)
      setLoading(false)
    } catch(e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  async function deleteProduct(productId: number) {
    try {
      setError('')
      setLoading(true)
      await axios.delete(`https://fakestoreapi.com/products/${productId}`)
      setProducts(prev => prev.filter(product => product.id !== productId))
      setLoading(false)
    } catch(e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return { products, error, loading, addProduct, deleteProduct }
}