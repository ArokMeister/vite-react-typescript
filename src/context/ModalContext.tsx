import React, { createContext, useState } from "react";

interface IModalContext {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const ModalContext = createContext<IModalContext>({
  isOpen: false,
  open: () => {},
  close: () => {}
})

export const ModalState = ({ children }: {children: React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      { children }
    </ModalContext.Provider>
  )
}