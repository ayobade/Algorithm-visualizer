import React, { useMemo, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

function CodeViewer({ title, code }) {
    const languages = useMemo(() => Object.keys(code || {}), [code])
    const [active, setActive] = useState(languages[0] || 'javascript')
    const content = code?.[active] || ''
    const [copied, setCopied] = useState(false)
    const timerRef = useRef(null)

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(content)
            setCopied(true)
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => setCopied(false), 5000)
        } catch {}
    }

    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

    return (
        <div>
            <HeaderRow>
                <Title>{title} Implementation</Title>
                <CopyButton onClick={onCopy} aria-label="Copy code">{copied ? 'Copied' : 'Copy Code'}</CopyButton>
            </HeaderRow>
            <Tabs>
                {languages.map((lang) => (
                    <Tab key={lang} $active={active===lang} onClick={()=>setActive(lang)}>
                        {labelFor(lang)}
                    </Tab>
                ))}
            </Tabs>
            <CodeBlock>
                <pre>{content}</pre>
            </CodeBlock>
        </div>
    )
}

export default CodeViewer

const labelFor = (k) => ({ javascript: 'JavaScript', python: 'Python', c: 'C', cpp: 'C++', java: 'Java' }[k] || k)

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
`

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #ffffff;
`

const CopyButton = styled.button`
    padding: 8px 12px;
    border-radius: 10px;
    background: rgba(255,255,255,0.12);
    color: #ffffff;
    border: 1px solid rgba(255,255,255,0.2);
    cursor: pointer;
`

const Tabs = styled.div`
    display: flex;
    gap: 10px;
    margin: 12px 0;
    flex-wrap: wrap;
`

const Tab = styled.button`
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid ${({ $active }) => ($active ? '#ffffff' : 'rgba(255,255,255,0.18)')};
    background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.12)' : 'transparent')};
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
`

const CodeBlock = styled.div`
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    background: rgba(0,0,0,0.5);
    padding: 12px;
    overflow: auto;
    pre {
        margin: 0;
        color: #e5e7eb;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.6;
        white-space: pre-wrap;
        word-break: break-word;
    }
    @media (max-width: 480px) {
        padding: 10px;
        pre { font-size: 12px; }
    }
`