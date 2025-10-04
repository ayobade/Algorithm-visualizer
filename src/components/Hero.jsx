import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <HeroSection>
            <HeroContent>
                <MainHeading>
                    Experience Unmatched Algorithm Visualization With Lightning-Fast Processing
                </MainHeading>
                <Description>
                    Empower your learning with our interactive algorithm visualizer, delivering precise step-by-step execution and rapid processing to elevate your understanding
                </Description>
                <CTAButtons>
                    <PrimaryLink to="/SearchVisualizer">Start Visualizing</PrimaryLink>
                </CTAButtons>
                
               <div> <Img src="/img1.jfif" alt="hero" /></div>
            </HeroContent>
        </HeroSection>
    )
}

const HeroSection = styled.section`
    min-height: 100vh;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 24px 40px;
    position: relative;
    z-index: 2;
`

const HeroContent = styled.div`
    max-width: 1200px;
    width: 100%;
    text-align: center;
    color: #ffffff;
`

const MainHeading = styled.h1`
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 24px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`

const Description = styled.p`
    font-size: clamp(1rem, 2vw, 1rem);
    line-height: 1.6;
    margin-bottom: 40px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.9;
`

const CTAButtons = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 80px;
    flex-wrap: wrap;
`



const PrimaryLink = styled(Link)`
    background: #ffffff;
    color: #000000;
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;
    text-decoration: none;
    display: inline-block;
    
    &:hover {
        transform: translateY(-2px);
    }
`



const Img = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
`



export default Hero