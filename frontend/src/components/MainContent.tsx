import React from 'react'

const MainContent = ({ activeContent }) => {
  const renderContent = () => {
    switch (activeContent) {
      case 'Quicklinks':
      case 'Fågelhus':
        return (
          <div className="space-y-2">
            {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((item, index) => (
              <div key={index} className="bg-card p-2 rounded flex items-center justify-between">
                <span>{item}</span>
                <button className="text-primary hover:text-primary-foreground">View</button>
              </div>
            ))}
          </div>
        )
      case 'Stocks':
        return (
          <div className="space-y-2">
            {['Buy AAPL', 'Sell GOOGL', 'Research TSLA', 'Monitor MSFT', 'Analyze AMZN'].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-card-foreground">{item}</span>
              </div>
            ))}
          </div>
        )
      default:
        return (
          <>
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Landing page</h2>
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded inline-block mb-2">
              A more productive browser experience
            </div>
            <p className="text-muted-foreground mb-4">Keep your custom prompts, documents, images, and bookmarks side-by-side and always just a click away.</p>
            <div className="space-y-2">
              {['Write landing page copy', 'Releases pages', 'Guide section', 'More videos', 'Promo video'].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" defaultChecked={index === 0} />
                  <span className="text-card-foreground">{item}</span>
                </div>
              ))}
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="bg-card p-4 rounded-lg">
        {renderContent()}
      </div>
    </div>
  )
}

export default MainContent