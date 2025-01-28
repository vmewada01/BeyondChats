import { Bot } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="border-b bg-white px-4 py-4">
    <div className="mx-auto flex max-w-7xl items-center justify-between">
      <div className="flex items-center space-x-2">
        <Bot className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold">BeyondChats</span>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
