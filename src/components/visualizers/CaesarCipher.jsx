import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

function CaesarCipher({ title }) {
    const [mode, setMode] = useState('encrypt')
    const [shift, setShift] = useState(3)
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [speed, setSpeed] = useState(1)
    const [isRunning, setIsRunning] = useState(false)
    const [index, setIndex] = useState(-1)
    const [preview, setPreview] = useState('')
    const [hasStarted, setHasStarted] = useState(false)
    const speedRef = useRef(1)
    const runningRef = useRef(false)
    useEffect(()=>{ speedRef.current = speed },[speed])

    const transformChar = (ch, k)=>{
        const a='a'.charCodeAt(0), z='z'.charCodeAt(0)
        const A='A'.charCodeAt(0), Z='Z'.charCodeAt(0)
        const c = ch.charCodeAt(0)
        if (c>=a && c<=z) return String.fromCharCode(((c-a+k)%26)+a)
        if (c>=A && c<=Z) return String.fromCharCode(((c-A+k)%26)+A)
        return ch
    }

    const run = async ()=>{
        const k = ((mode==='encrypt'?shift:-shift)%26+26)%26
        const chars = input.split('')
        const out = []
        setIsRunning(true); runningRef.current = true
        setHasStarted(true)
        setPreview('')
        setOutput('')
        setIndex(-1)
        for (let i=0;i<chars.length;i++){
            if (!runningRef.current) break
            setIndex(i)
            const delay = Math.max(40, 520 / speedRef.current)
            await sleep(delay)
            out.push(transformChar(chars[i], k))
            setPreview(out.join('') + input.slice(i+1))
        }
        setOutput(out.join(''))
        setIndex(-1)
        setIsRunning(false); runningRef.current = false
    }


    return (
        <div>
            <Title>{title} Visualization</Title>
            <Panel>
                <Row two>
                    <PrimaryButton disabled={isRunning} onClick={()=>{
                        setMode(m=> m==='encrypt' ? 'decrypt' : 'encrypt')
                    }}>Switch to {mode==='encrypt' ? 'Decrypt' : 'Encrypt'}</PrimaryButton>
                    <SuccessButton disabled={isRunning || !input} onClick={run}>Start {title}</SuccessButton>
                </Row>
                <Row>
                    <Input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter text" />
                    <NumberInput type="number" value={shift} onChange={(e)=>setShift(Number(e.target.value))} />
                    <DangerButton onClick={()=>{
                        runningRef.current = false
                        setIsRunning(false)
                        setIndex(-1)
                        setOutput('')
                        setPreview('')
                        setInput('')
                        setShift(3)
                        setMode('encrypt')
                    }}>Reset</DangerButton>
                </Row>
                <Row align="center">
                    <Label>Speed:</Label>
                    <Slider type="range" min="1" max="5" step="1" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} />
                    <Multiplier>{speed}x</Multiplier>
                </Row>
                <VisualArea>
                    <Meta>
                        <Badge>Mode: {mode}</Badge>
                        <Badge>Shift: {shift}</Badge>
                    </Meta>
                    <Canvas>
                        <TwoCols>
                            <Col>
                                <Label>Input</Label>
                                <CodeBox>
                                    {input.split('').map((ch,i)=> (
                                        <Char key={`in-${i}`} $active={i===index}>{ch}</Char>
                                    ))}
                                </CodeBox>
                            </Col>
                            <Arrow>→</Arrow>
                            <Col>
                                <Label>Output</Label>
                                <CodeBox>
                                    {hasStarted && preview.split('').map((ch,i)=> (
                                        <Char key={`out-${i}`} $ok={i<index}>{ch}</Char>
                                    ))}
                                </CodeBox>
                            </Col>
                        </TwoCols>
                    </Canvas>
                </VisualArea>
                {output && (
                    <Preview>
                        Result: {output}
                    </Preview>
                )}
            </Panel>
        </div>
    )
}

export default CaesarCipher

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
    grid-template-columns: ${({ two, align }) => two ? '1fr 1fr' : (align === 'center' ? 'auto 1fr auto' : '1fr 140px auto 1fr')};
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

const NumberInput = styled.input`
    width: 90px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.06);
    color: #e5e7eb;
    padding: 0 12px;
    outline: none;
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
    min-height: 180px;
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
`

const TwoCols = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 14px;
    width: 100%;
    align-items: start;
`

const Col = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
`

const CodeBox = styled.div`
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 10px;
    min-height: 64px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 8px;
`

const Char = styled.span`
    padding: 6px 8px;
    border-radius: 8px;
    background: ${({ $ok, $active }) => $active ? 'rgba(245, 158, 11, 0.28)' : ($ok ? 'rgba(16,185,129,0.22)' : 'rgba(255,255,255,0.08)')};
    border: 1px solid rgba(255,255,255,0.18);
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 0.4px;
`

const Arrow = styled.div`
    align-self: center;
    color: #ffffff;
    font-size: 20px;
`

const Preview = styled.div`
    margin-top: 8px;
    color: rgba(229,231,235,0.9);
`

