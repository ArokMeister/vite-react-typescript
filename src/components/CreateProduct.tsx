import axios from "axios"
import React, { useState } from "react"
import { IProduct } from "../modules"
import { ErrorMessage } from "./ErrorMessage"

const productData: IProduct = {
  title: "",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 }
}


interface CreateProductProps {
  onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  
  const handlerSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    setError('')

    if (value.trim().length === 0) {
      setError('Please enter valid title')
      return
    }

    productData.title = value
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)

    onCreate(response.data)
  }

  const handlerChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }
  
  return (
    <form onSubmit={handlerSubmit}>
      <input 
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-none"
        placeholder="Product title..."
        value={value}
        onChange={handlerChange}
      />
      {error && <ErrorMessage error={error} />}
      <button type="submit" className="py-2 px-4 border bg-green-400 hover:text-white">Ceate</button>
    </form>
  )
}