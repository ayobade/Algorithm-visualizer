import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <FooterBar>
            <FooterInner>
                <Brand>
                    <BrandLogo src="/AlgoLogo.png" alt="AlgoVisualizer" />
                    <BrandText>AlgoVisualizer</BrandText>
                </Brand>
                <Links>
                    <a href="#">Visualizer</a>
                    <a href="#">Code Viewer</a>
                    <a href="#">About</a>
                    <a href="#">Support</a>
                </Links>
            </FooterInner>
            <BottomRow>
                <small>© 2025 AlgoVisualizer. All rights reserved.</small>
                <Policies>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </Policies>
            </BottomRow>
        </FooterBar>
    )
}

const FooterBar = styled.footer`
    width: 100%;
    color: #e5e7eb;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 32px 24px;
    background: transparent;
`

const FooterInner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
`

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const BrandLogo = styled.img`
    height: 20px;
    width: auto;
    filter: brightness(0) invert(1);
`

const BrandText = styled.span`
    font-weight: 600;
    font-size: 14px;
`

const Links = styled.nav`
    display: flex;
    gap: 18px;
    a {
        color: rgba(229,231,235,0.9);
        text-decoration: none;
        font-size: 14px;
    }
    a:hover { color: #ffffff; }
`

const BottomRow = styled.div`
    max-width: 1200px;
    margin: 16px auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    color: rgba(229,231,235,0.7);
    font-size: 12px;
    flex-wrap: wrap;
`

const Policies = styled.div`
    display: flex;
    gap: 16px;
    a {
        color: inherit;
        text-decoration: none;
    }
    a:hover { color: #ffffff; }
`

export default Footer


