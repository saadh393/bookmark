import React from 'react'
import { Layers, Facebook, Settings } from 'lucide-react'

const Quicklinks = () => {
  return (
    <div className="bg-card p-4">
      <h3 className="text-sm font-semibold mb-2 flex items-center text-card-foreground">
        <Layers className="w-4 h-4 mr-2 text-chart-1" />
        Quicklinks
      </h3>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2 bg-accent p-2 rounded">
          <Layers className="w-4 h-4 text-chart-2" />
          <span className="text-xs text-accent-foreground">tabOS assets - Google...</span>
        </div>
        <div className="flex items-center space-x-2 bg-accent p-2 rounded">
          <Facebook className="w-4 h-4 text-chart-3" />
          <span className="text-xs text-accent-foreground">Facebook</span>
        </div>
        <div className="flex items-center space-x-2 bg-accent p-2 rounded">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-accent-foreground">Assistants tools -...</span>
        </div>
      </div>
    </div>
  )
}

export default Quicklinks