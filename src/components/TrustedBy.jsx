import React from 'react'
import styled from 'styled-components'

function TrustedBy() {
    return (
        <Section>
            <Inner>
                <Caption>Trusted by leading companies.</Caption>
                <Logos>
                    <Logo>Google</Logo>
                    <Logo>GitHub</Logo>
                    <Logo>HackerRank</Logo>
                    <Logo>Stack Overflow</Logo>
                    <Logo>Google</Logo>
                </Logos>
            </Inner>
        </Section>
    )
}

const Section = styled.section`
    width: 100%;
    padding: 40px 24px 60px;
    background: transparent;
`

const Inner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
`

const Caption = styled.div`
    color: #ffffff;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
`

const Logos = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 28px;
    align-items: center;
    justify-items: center;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        row-gap: 18px;
    }
`

const Logo = styled.span`
    color: #FFFFFF;
    font-weight: 400;
    letter-spacing: 0.4px;
    font-size: 24px;
`

export default TrustedBy


