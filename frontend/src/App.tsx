import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Quicklinks from './components/Quicklinks'
import Toolbar from './components/Toolbar'
import { Sun, Moon } from 'lucide-react'
import Dialog from './components/Dialog'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeContent, setActiveContent] = useState('Landing page')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState('')

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handlePlusClick = (type : string) => {
    setDialogType(type)
    setIsDialogOpen(true)
  }

  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-1 flex">
        <Sidebar setActiveContent={setActiveContent} />
        <MainContent activeContent={activeContent} />
      </div>
      <Quicklinks />
      <Toolbar onPlusClick={handlePlusClick} />
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 bg-primary text-primary-foreground rounded-full"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type={dialogType} />
    </div>
  )
}

export default App