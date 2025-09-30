import React from 'react'
import styled from 'styled-components'

function HowItWorks() {
    return (
        <Section>
            <Inner>
                <HeaderRow>
                    <Title>How it works</Title>
                    <Subtitle>Visualize any algorithm in three simple steps</Subtitle>
                </HeaderRow>
                <Steps>
                    <StepCard>
                        <Badge>1</Badge>
                        <StepTitle>Pick an algorithm</StepTitle>
                        <StepText>Select sorting, searching, pathfinding, and more.</StepText>
                    </StepCard>
                    <StepCard>
                        <Badge>2</Badge>
                        <StepTitle>Set inputs</StepTitle>
                        <StepText>Provide data, speed, and visual preferences.</StepText>
                    </StepCard>
                    <StepCard>
                        <Badge>3</Badge>
                        <StepTitle>Run & inspect</StepTitle>
                        <StepText>Play, pause, step-through, and view code.</StepText>
                    </StepCard>
                </Steps>
            </Inner>
        </Section>
    )
}

const Section = styled.section`
    width: 100%;
    padding: 72px 24px 88px;
    background: transparent;
`

const Inner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
    color: #ffffff;
`

const HeaderRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;
`

const Title = styled.h2`
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
`

const Subtitle = styled.p`
    color: rgba(229,231,235,0.8);
    font-size: 14px;
`

const Steps = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`

const StepCard = styled.div`
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    backdrop-filter: blur(8px);
`

const Badge = styled.span`
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    color: #0b0b0b;
    font-weight: 700;
    font-size: 14px;
`

const StepTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
`

const StepText = styled.p`
    color: rgba(229,231,235,0.8);
    font-size: 14px;
`

export default HowItWorks


