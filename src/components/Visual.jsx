import React from 'react'
import BubbleSort from './visualizers/BubbleSort'
import SelectionSort from './visualizers/SelectionSort'
import LinearSearch from './visualizers/LinearSearch'
import BreadthFirstSearch from './visualizers/BreadthFirstSearch'
import CaesarCipher from './visualizers/CaesarCipher'

function Visual({ title }) {
    const normalized = (title || '').toLowerCase()
    if (normalized.includes('linear')) return <LinearSearch title={title} />
    if (normalized.includes('selection')) return <SelectionSort title={title} />
    if (normalized.includes('breadth') || normalized.includes('bfs')) return <BreadthFirstSearch title={title} />
    if (normalized.includes('caesar')) return <CaesarCipher title={title} />
    if (normalized.includes('bubble')) return <BubbleSort title={title} />
    return <BubbleSort title={title} />
}

export default Visual