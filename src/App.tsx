import React, { useEffect } from 'react'
import Graph from 'graphology'

export default function App() {
  useEffect(() => {
    const graph = new Graph()

    // Adding some nodes
    graph.addNode('John')
    graph.addNode('Martha')

    // Adding an edge
    graph.addEdge('John', 'Martha')

    // Displaying useful information
    console.log('Number of nodes:', graph.order)
    console.log('Number of edges:', graph.size)

    // Iterating over nodes
    graph.forEachNode(node => {
      console.log('Node:', node)
    })
  }, [])

  return (
    <div className="p-6">
      <h1>Hello Graphology 👋</h1>
      <p>Open the console to see graph logs.</p>
    </div>
  )
}