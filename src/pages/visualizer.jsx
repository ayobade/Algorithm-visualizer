import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { algorithms } from '../components/data/algorithim'
import HowVisualizerWorks from '../components/HowVisualizerWorks'
import Visual from '../components/Visual'
import CodeViewer from '../components/CodeViewer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components'

function Visualizer() {
    const location = useLocation()
    const { id } = useParams()
    const passedTitle = location?.state?.title
    const flatList = Object.values(algorithms).flat()
    const algo = id ? flatList.find(a => a.id === id) : flatList.find(a => a.title === passedTitle)
    const title = algo?.title || passedTitle || 'Visualizer'
    return (
        <div>
            <Header />
            <Grid>
                <Pane>
                    <HowVisualizerWorks title={title} />
                    {algo?.howItWorks && (
                        <ul>
                            <strong>How it works</strong>
                            {algo.howItWorks.map((s,i)=> (<li key={i}>{s}</li>))}
                        </ul>
                    )}
                    {algo?.uses && (
                        <ul>
                            <strong>Uses</strong>
                            {algo.uses.map((s,i)=> (<li key={`use-${i}`}>{s}</li>))}
                        </ul>
                    )}
                </Pane>
                <Pane>
                    <Visual title={title} />
                </Pane>
                <Pane>
                    <CodeViewer title={title} code={algo?.code} />
                </Pane>
            </Grid>
            <Footer />
        </div>
    )
}

const Grid = styled.section`
    display: grid;
    gap: 16px;
    padding: 24px;
    grid-template-columns: .6fr 1.4fr .6fr;
    align-items: start;
    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`

const Pane = styled.div`
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 16px;
`

export default Visualizer
