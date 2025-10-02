import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

function BubbleSort({ title }) {
    const [speed, setSpeed] = useState(1)
    const [input, setInput] = useState('')
    const [array, setArray] = useState([])
    const [comparisons, setComparisons] = useState(0)
    const [swaps, setSwaps] = useState(0)
    const [isSorting, setIsSorting] = useState(false)
    const [activePair, setActivePair] = useState([-1, -1])
    const [swapPair, setSwapPair] = useState([-1, -1])
    const [flashPair, setFlashPair] = useState([-1, -1])
    const [sortedRightStart, setSortedRightStart] = useState(0)
    const speedRef = useRef(1)
    const sortingRef = useRef(false)
    useEffect(()=>{ speedRef.current = speed },[speed])

    const bubbleSort = async () => {
        const arr = array.slice()
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (!sortingRef.current) return
                setActivePair([j, j+1])
                setComparisons((c)=>c+1)
                const delay = Math.max(50, 600 / speedRef.current)
                await sleep(delay)
                if (arr[j] > arr[j+1]) {
                    setSwapPair([j, j+1])
                    await sleep(Math.max(80, 500 / speedRef.current))
                    const tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp
                    setSwaps((s)=>s+1)
                    setArray(arr.slice())
                    await sleep(Math.max(80, 500 / speedRef.current))
                    setSwapPair([-1, -1])
                } else {
                    setFlashPair([j, j+1])
                    await sleep(Math.max(60, 360 / speedRef.current))
                    setFlashPair([-1, -1])
                }
            }
            setSortedRightStart(arr.length - i - 1)
        }
    }

    return (
        <div>
            <Title>{title} Visualization</Title>
            <Panel>
                <Row two>
                    <PrimaryButton disabled={isSorting} onClick={()=>{
                        const len = 8
                        const rand = Array.from({length: len}, ()=> Math.floor(Math.random()*90)+10)
                        setInput(rand.join(', '))
                        setArray(rand)
                        setComparisons(0)
                        setSwaps(0)
                        setActivePair([-1,-1])
                        setSortedRightStart(rand.length)
                    }}>Generate Random Array</PrimaryButton>
                    <SuccessButton disabled={isSorting || array.length===0} onClick={async()=>{
                        if (isSorting || array.length===0) return
                        setIsSorting(true); sortingRef.current = true
                        setComparisons(0); setSwaps(0); setActivePair([-1,-1])
                        await bubbleSort()
                        setActivePair([-1,-1])
                        setIsSorting(false); sortingRef.current = false
                    }}>Start {title}</SuccessButton>
                </Row>
                <Row>
                    <Input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Example: 5, 3, 8, 1, 2" />
                    <DarkButton disabled={!input.trim() || isSorting} onClick={()=>{
                        const parsed = input
                          .split(',')
                          .map(s=>s.trim())
                          .filter(s=>s!=='' && !Number.isNaN(Number(s)))
                          .map(Number)
                        setArray(parsed)
                        setSortedRightStart(parsed.length)
                    }}>Use Array</DarkButton>
                    <DangerButton onClick={()=>{
                        sortingRef.current = false
                        setIsSorting(false)
                        setActivePair([-1,-1])
                        setComparisons(0)
                        setSwaps(0)
                        setArray([])
                        setInput('')
                        setSortedRightStart(0)
                    }}>Reset All</DangerButton>
                </Row>
                <Row align="center">
                    <Label>Speed:</Label>
                    <Slider type="range" min="1" max="5" step="1" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} />
                    <Multiplier>{speed}x</Multiplier>
                </Row>
                <VisualArea>
                    <Meta>
                        <Badge>Comparisons: {comparisons}</Badge>
                        <Badge>Swaps: {swaps}</Badge>
                    </Meta>
                    <Canvas>
                        {array.length > 0 ? (
                            <BoxesArea>
                                {array.map((value, index) => (
                                    <Box
                                        key={`${index}-${value}`}
                                        $active={activePair.includes(index)}
                                        $swapLeft={swapPair[0]===index}
                                        $swapRight={swapPair[1]===index}
                                        $flash={flashPair.includes(index)}
                                        $final={index >= sortedRightStart}
                                    >{value}</Box>
                                ))}
                            </BoxesArea>
                        ) : (
                            <Placeholder>Generate or enter an array to begin</Placeholder>
                        )}
                    </Canvas>
                </VisualArea>
                {array.length > 0 && (
                    <Preview>
                        Current array: [{array.join(', ')}]
                    </Preview>
                )}
            </Panel>
        </div>
    )
}

export default BubbleSort

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
    grid-template-columns: ${({ two, align }) => two ? '1fr 1fr' : (align === 'center' ? 'auto 1fr auto' : '1fr 200px 1fr')};
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
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.08);
    color: #ffffff;
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
    background: ${({ $final, $flash }) => $final
        ? 'rgba(0, 218, 145, 0.54)'
        : ($flash ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)')};
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
    transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 160ms ease;
    transform: ${({ $swapLeft, $swapRight }) => $swapLeft ? 'translateX(22px)' : ($swapRight ? 'translateX(-22px)' : 'translateX(0)')};
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

const Preview = styled.div`
    margin-top: 8px;
    color: rgba(229,231,235,0.9);
`


