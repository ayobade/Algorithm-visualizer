import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

function LinearSearch({ title }) {
    const [speed, setSpeed] = useState(1)
    const [input, setInput] = useState('')
    const [target, setTarget] = useState('')
    const [array, setArray] = useState([])
    const [comparisons, setComparisons] = useState(0)
    const [isSearching, setIsSearching] = useState(false)
    const [searchFinished, setSearchFinished] = useState(false)
    const [index, setIndex] = useState(-1)
    const [foundIndex, setFoundIndex] = useState(-1)
    const [flashOk, setFlashOk] = useState(-1)
    const speedRef = useRef(1)
    const searchingRef = useRef(false)
    useEffect(()=>{ speedRef.current = speed },[speed])

    const runSearch = async () => {
        setComparisons(0)
        setFoundIndex(-1)
        setSearchFinished(false)
        for (let i = 0; i < array.length; i++) {
            if (!searchingRef.current) return
            setIndex(i)
            setComparisons(c=>c+1)
            const delay = Math.max(50, 600 / speedRef.current)
            await sleep(delay)
            if (String(array[i]) === target.trim()) {
                setFoundIndex(i)
                setFlashOk(i)
                await sleep(Math.max(120, 600 / speedRef.current))
                setFlashOk(-1)
                break
            }
        }
        setIndex(-1)
        setIsSearching(false); searchingRef.current = false
        setSearchFinished(true)
    }

    return (
        <div>
            <Title>{title} Visualization</Title>
            <Panel>
                <Row $two>
                    <PrimaryButton disabled={isSearching} onClick={()=>{
                        const len = 10
                        const rand = Array.from({length: len}, ()=> Math.floor(Math.random()*90)+10)
                        setInput(rand.join(', '))
                        setArray(rand)
                        setComparisons(0)
                        setIndex(-1)
                        setFoundIndex(-1)
                    }}>Generate Random Array</PrimaryButton>
                    <SuccessButton disabled={isSearching || array.length===0 || !target.trim()} onClick={()=>{
                        if (isSearching || array.length===0 || !target.trim()) return
                        setIsSearching(true); searchingRef.current = true
                        runSearch()
                    }}>Start {title}</SuccessButton>
                </Row>
                <Row>
                    <Input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Example: 5, 3, 8, 1, 2" />
                    <DarkButton disabled={!input.trim() || isSearching} onClick={()=>{
                        const parsed = input
                          .split(',')
                          .map(s=>s.trim())
                          .filter(s=>s!=='')
                          .map(Number)
                        setArray(parsed)
                        setIndex(-1); setFoundIndex(-1); setSearchFinished(false)
                    }}>Use Array</DarkButton>
                    <Input value={target} onChange={(e)=>setTarget(e.target.value)} placeholder="Target value" />
                    <DangerButton onClick={()=>{
                        searchingRef.current = false
                        setIsSearching(false)
                        setIndex(-1)
                        setFoundIndex(-1)
                        setComparisons(0)
                        setArray([])
                        setInput('')
                        setTarget('')
                        setSearchFinished(false)
                    }}>Reset</DangerButton>
                </Row>
                <Row $align="center">
                    <Label>Speed:</Label>
                    <Slider type="range" min="1" max="5" step="1" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} />
                    <Multiplier>{speed}x</Multiplier>
                </Row>
                <VisualArea>
                    <Meta>
                        <Badge>Checks: {comparisons}</Badge>
                        {foundIndex >= 0 && <Badge $success>Found at index {foundIndex}</Badge>}
                        {searchFinished && foundIndex < 0 && <Badge $danger>Not found</Badge>}
                    </Meta>
                    <Canvas>
                        {array.length > 0 ? (
                            <BoxesArea>
                                {array.map((value, i) => (
                                    <Box key={`${i}-${value}`}
                                         $active={index===i}
                                         $ok={flashOk===i}
                                         $found={foundIndex===i}
                                    >{value}</Box>
                                ))}
                            </BoxesArea>
                        ) : (
                            <Placeholder>Generate or enter an array to begin</Placeholder>
                        )}
                    </Canvas>
                </VisualArea>
            </Panel>
        </div>
    )
}

export default LinearSearch

async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)) }

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #ffffff;
`

const Panel = styled.div`
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.45);
    border-radius: 12px;
    padding: 16px;
`

const Row = styled.div`
    display: grid;
    grid-template-columns: ${({ $two, $align }) => $two ? '1fr 1fr' : ($align === 'center' ? 'auto 1fr auto' : '1fr auto 1fr')};
    gap: 12px;
    margin-bottom: 12px;
    align-items: center;
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`

const ButtonBase = styled.button`
    height: 44px;
    border-radius: 10px;
    border: 1px solid transparent;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
`

const PrimaryButton = styled(ButtonBase)`
    background:rgb(255, 255, 255);
    color:rgb(0, 0, 0);
`

const SuccessButton = styled(ButtonBase)`
    background:rgb(12, 12, 12);
    color:rgb(255, 255, 255);
`

const DangerButton = styled(ButtonBase)`
    background: #ef4444;
    color: #ffffff;
`

const DarkButton = styled(ButtonBase)`
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.18);
    color: rgba(229,231,235,0.9);
    &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const Input = styled.input`
    height: 44px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.06);
    color: #e5e7eb;
    padding: 0 12px;
    outline: none;
    &::placeholder { color: rgba(229,231,235,0.6); }
`

const Label = styled.span`
    color: #ffffff;
`

const Slider = styled.input`
    appearance: none;
    height: 6px;
    background: rgba(255,255,255,0.18);
    border-radius: 9999px;
    outline: none;
    &::-webkit-slider-thumb {
        appearance: none;
        height: 18px;
        width: 18px;
        border-radius: 9999px;
        background: #1d4ed8;
        border: 2px solid #93c5fd;
        margin-top: -6px;
    }
`

const Multiplier = styled.span`
    color: #ffffff;
    justify-self: end;
`

const VisualArea = styled.div`
    margin-top: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.5);
    border-radius: 12px;
    padding: 12px;
`

const Meta = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
    flex-wrap: wrap;
`

const Badge = styled.span`
    border: 1px solid
        ${({ $danger, $success }) => ($danger
            ? 'rgba(239,68,68,0.45)'
            : ($success ? 'rgba(16,185,129,0.45)' : 'rgba(255,255,255,0.18)'))};
    background:
        ${({ $danger, $success }) => ($danger
            ? 'rgba(239,68,68,0.18)'
            : ($success ? 'rgba(16,185,129,0.22)' : 'rgba(255,255,255,0.08)'))};
    color:
        ${({ $danger, $success }) => ($danger
            ? '#fecaca'
            : ($success ? '#bbf7d0' : '#ffffff'))};
    padding: 6px 10px;
    border-radius: 9999px;
    font-size: 12px;
`

const Canvas = styled.div`
    height: auto;
    min-height: 220px;
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
    display: flex;
    align-items: center;
    padding: 12px;
`

const BoxesArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    height: 100%;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
`

const Box = styled.div`
    border: 1px solid rgba(255,255,255,0.18);
    background: ${({ $found, $ok }) => $found ? 'rgba(0, 218, 145, 0.54)' : ($ok ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)')};
    color: #ffffff;
    border-radius: 10px;
    min-height: 52px;
    flex: 0 0 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    letter-spacing: 0.4px;
    outline: ${({ $active }) => $active ? '2px solid #f59e0b' : 'none'};
    box-shadow: ${({ $active }) => $active ? '0 0 0 2px rgba(245,158,11,0.2)' : 'none'};
    transition: background-color 160ms ease;
`

const Placeholder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(229,231,235,0.5);
    text-align: center;
    width: 100%;
    height: 100%;
`


