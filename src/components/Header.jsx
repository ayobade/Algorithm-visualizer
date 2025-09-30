import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <HeaderBar>
            <HeaderInner>
                <Logo>
                    <LogoImg src="/AlgoLogo.png" alt="logo" />
                    <LogoText>AlgoVisualizer</LogoText>
                </Logo>
                <Nav>
                  
                    <NavItem><Anchor href="#">Visualizer</Anchor></NavItem>
                    <NavItem><Anchor href="#">Code Viewer</Anchor></NavItem>                 
                    <NavItem><Anchor href="#">About</Anchor></NavItem>
                </Nav>
                <Actions>
                    <SecondaryButton as="a" href="#">Sign In</SecondaryButton>
                    <PrimaryButton as="a" href="#">Get Started</PrimaryButton>
                </Actions>
            </HeaderInner>
        </HeaderBar>
    )
}

const HeaderBar = styled.header`
    width: 100vw;
    color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 10;
    background: transparent;
`

const HeaderInner = styled.div`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`

const LogoImg = styled.img`
    height: 40px;
    width: auto;
    display: block;
    filter: brightness(0) invert(1);
`

const LogoText = styled.span`
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
`

const Nav = styled.ul`
    list-style: none;
    display: flex;
    gap: 28px;
    margin: 0;
    padding: 0 24px;
    align-items: center;
    flex: 1;
    justify-content: center;
`

const NavItem = styled.li`
    display: inline-flex;
    align-items: center;
`

const Anchor = styled.a`
    text-decoration: none;
    color: rgba(255,255,255,0.9);
    font-size: 14px;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    &:hover { color: #ffffff; }
`



const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const BaseButton = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 9999px;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.35);
    background-color: transparent;
    color: #ffffff;
    text-decoration: none;
`

const SecondaryButton = styled(BaseButton)``

const PrimaryButton = styled(BaseButton)`
    background-color: #ffffff;
    color: #0b0b0b;
    border-color: #ffffff;
    text-decoration: none;
`

export default Header