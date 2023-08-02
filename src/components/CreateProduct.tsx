import axios from "axios"
import React, { useState } from "react"
import { IProduct } from "../modules"
import { ErrorMessage } from "./ErrorMessage"

interface CreateProductProps {
  onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
  
  const [error, setError] = useState('')
  const [productData, setProductData] = useState<IProduct>({
    title: "",
    description: "",
    price: "",
    image: "",
    rating: { rate: 0 }
  });

  const inputClasses = 'border py-2 px-4 mb-2 w-full outline-none'
  
  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setError("");
  
    if (productData.title.trim().length === 0) {
      setError("Please enter a valid title");
      return;
    }
  
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData);
  
    onCreate(response.data);
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        name="title"
        className={inputClasses}
        placeholder="Product title..."
        value={productData.title}
        onChange={handleInputChange}
      />
      <input 
        type="text"
        name="description"
        className={inputClasses}
        placeholder="Product description..."
        value={productData.description}
        onChange={handleInputChange}
      />
      <input 
        type="text"
        name="price"
        className={inputClasses}
        placeholder="Product price..."
        value={productData.price}
        onChange={handleInputChange}
      />
      <input 
        type="text"
        name="image"
        className={inputClasses}
        placeholder="Product image URL..."
        value={productData.image}
        onChange={handleInputChange}
      />
      <input 
        type="number"
        name="rate"
        className={inputClasses}
        placeholder="Product rate..."
        value={productData.rating?.rate}
        onChange={handleInputChange}
      />
      {error && <ErrorMessage error={error} />}
      <button type="submit" className="py-2 px-4 border bg-green-400 hover:text-white">Ceate</button>
    </form>
  )
}