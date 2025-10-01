import React from 'react'
import { useLocation } from 'react-router-dom'
import HowVisualizerWorks from '../components/HowVisualizerWorks'
import Visual from '../components/Visual'
import CodeViewer from '../components/CodeViewer'
import Header from '../components/Header'
import Footer from '../components/footer'
import styled from 'styled-components'

function Visualizer() {
    const location = useLocation()
    const title = location?.state?.title || 'Visualizer'
    return (
        <div>
            <Header />
            <Grid>
                <Pane>
                    <HowVisualizerWorks title={title} />
                </Pane>
                <Pane>
                    <Visual title={title} />
                </Pane>
                <Pane>
                    <CodeViewer title={title} />
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
    grid-template-columns: 1.2fr 1.4fr 1.2fr;
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
