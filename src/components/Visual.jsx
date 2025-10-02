import React from 'react'
import BubbleSort from './visualizers/BubbleSort'
import SelectionSort from './visualizers/SelectionSort'

function Visual({ title }) {
    const normalized = (title || '').toLowerCase()
    if (normalized.includes('selection')) return <SelectionSort title={title} />
    if (normalized.includes('bubble')) return <BubbleSort title={title} />
    return <BubbleSort title={title} />
}

export default Visual