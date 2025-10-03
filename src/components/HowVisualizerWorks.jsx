import React from 'react'
import styled from 'styled-components'

function HowVisualizerWorks({ title }) {
    return (
        <Title>How {title} Works</Title>
    )
}

export default HowVisualizerWorks   

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #ffffff;
    @media (max-width: 600px) {
        font-size: 1.1rem;
        line-height: 1.3;
        word-break: break-word;
    }
`