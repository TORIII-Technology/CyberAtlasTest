import { useState } from "react"

const useDisclosure = (defaultValue) => {
  const [isOpen, setIsOpen] = useState(defaultValue || false)

  function onToggle(value) {
    setIsOpen((currentValue) =>
      typeof value === "boolean" ? value : !currentValue
    )
  }

  return {
    isOpen,
    onToggle,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  }
}

export default useDisclosure
