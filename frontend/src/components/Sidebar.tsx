import React from 'react'
import { Folder, BarChart2, FileText, Headphones } from 'lucide-react'

const Sidebar = ({ setActiveContent }) => {
  const items = [
    { icon: Folder, label: 'Quicklinks', color: 'text-chart-1' },
    { icon: Folder, label: 'Fågelhus', color: 'text-chart-4' },
    { icon: FileText, label: 'Stocks', color: 'text-muted-foreground' },
    { icon: FileText, label: 'Landing page', color: 'text-muted-foreground' },
    { icon: BarChart2, label: 'Analytics', color: 'text-chart-2' },
    { icon: Headphones, label: 'Headline helper', color: 'text-chart-5' },
  ]

  return (
    <div className="w-64 bg-card p-4">
      <h2 className="text-lg font-semibold mb-4 text-card-foreground">Saad's Controller</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-2 hover:bg-accent rounded cursor-pointer"
            onClick={() => setActiveContent(item.label)}
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="text-card-foreground">{item.label}</span>
            {index === 5 && <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded">New</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar