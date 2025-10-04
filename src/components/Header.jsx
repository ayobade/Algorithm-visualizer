import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SearchVisualizer from '../pages/SearchVisualizer'

function Header() {
    const [open, setOpen] = useState(false)
    return (
        <HeaderBar>
            <HeaderInner>
                <LogoLink to="/">
                    <LogoImg src="/AlgoLogo.png" alt="logo" />
                    <LogoText>AlgoVisualizer</LogoText>
                </LogoLink>
                <Nav>
                  
                    <NavItem><Anchor href="/SearchVisualizer">Visualizer</Anchor></NavItem>
                                    
                    <NavItem><Anchor href="#">About</Anchor></NavItem>
                </Nav>
                <Actions>
                    <PrimaryButton as={Link} to="/SearchVisualizer">Get Started</PrimaryButton>
                </Actions>
                <Hamburger onClick={()=>setOpen(v=>!v)} aria-label="menu">
                    <Bar />
                    <Bar />
                    <Bar />
                </Hamburger>
            </HeaderInner>
            {open && (
                <MobileMenu>
                    <a href="/SearchVisualizer" onClick={()=>setOpen(false)}>Visualizer</a>
                   
                    <a href="#" onClick={()=>setOpen(false)}>About</a>
                    <div className="actions">
                        <Link className="solid" to="/SearchVisualizer" onClick={()=>setOpen(false)}>Get Started</Link>
                    </div>
                </MobileMenu>
            )}
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

const LogoLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: inherit;
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
    @media (max-width: 760px) { display: none; }
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
    @media (max-width: 760px) { display: none; }
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

const Hamburger = styled.button`
    display: none;
    @media (max-width: 760px) { display: inline-flex; }
    flex-direction: column;
    gap: 4px;
    background: transparent;
    border: none;
    padding: 6px;
    cursor: pointer;
    margin-left: 8px;
`

const Bar = styled.span`
    width: 20px;
    height: 2px;
    background: #ffffff;
    display: block;
    border-radius: 2px;
`

const MobileMenu = styled.div`
    display: none;
    @media (max-width: 760px) { display: block; }
    background: rgba(0,0,0,0.6);
    border-top: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(10px);
    padding: 12px 16px;
    a { display: block; color: #fff; text-decoration: none; padding: 10px 0; }
    .actions { display: flex; gap: 10px; margin-top: 8px; }
    .ghost { border: 1px solid rgba(255,255,255,0.35); padding: 8px 12px; border-radius: 9999px; }
    .solid { background: #ffffff; color: #0b0b0b; padding: 8px 12px; border-radius: 9999px; }
`

export default Header