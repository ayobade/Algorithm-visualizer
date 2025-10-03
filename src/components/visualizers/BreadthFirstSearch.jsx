import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

function BreadthFirstSearch({ title }) {
    const [speed, setSpeed] = useState(1)
    const [mode, setMode] = useState('grid')
    const [rows, setRows] = useState(10)
    const [cols, setCols] = useState(14)
    const [grid, setGrid] = useState([])
    const [start, setStart] = useState([0, 0])
    const [goal, setGoal] = useState([9, 13])
    const [visited, setVisited] = useState(new Set())
    const [inQueue, setInQueue] = useState(new Set())
    const [queueView, setQueueView] = useState([])
    const [path, setPath] = useState(new Set())
    const [isRunning, setIsRunning] = useState(false)
    const [reached, setReached] = useState(false)
    const speedRef = useRef(1)
    const runningRef = useRef(false)
    useEffect(()=>{ speedRef.current = speed },[speed])

    const [graphNodes, setGraphNodes] = useState([])
    const [graphAdj, setGraphAdj] = useState({})
    const [gStart, setGStart] = useState(0)
    const [gGoal, setGGoal] = useState(0)
    const [gVisited, setGVisited] = useState(new Set())
    const [gInQueue, setGInQueue] = useState(new Set())
    const [gQueueView, setGQueueView] = useState([])
    const [gPath, setGPath] = useState(new Set())

    useEffect(()=>{ buildGrid(false); generateGraph(12) },[])

    const buildGrid = (withWalls)=>{
        const g = Array.from({length: rows}, (_, r)=>
            Array.from({length: cols}, (_, c)=>({ r, c, wall: withWalls && Math.random() < 0.18 }))
        )
        if (g[start[0]] && g[start[0]][start[1]]) g[start[0]][start[1]].wall = false
        if (g[goal[0]] && g[goal[0]][goal[1]]) g[goal[0]][goal[1]].wall = false
        setGrid(g)
        setVisited(new Set())
        setInQueue(new Set())
        setQueueView([])
        setPath(new Set())
        setReached(false)
    }

    const keyOf = (r,c)=>`${r},${c}`

    const reconstructPath = (parentMap, endKey)=>{
        const p = new Set()
        let k = endKey
        while (k && parentMap.has(k)) {
            p.add(k)
            k = parentMap.get(k)
        }
        p.add(keyOf(start[0], start[1]))
        setPath(p)
    }

    const bfs = async ()=>{
        const sr = start[0], sc = start[1]
        const gr = goal[0], gc = goal[1]
        const q = [[sr, sc]]
        const parent = new Map()
        const v = new Set([keyOf(sr, sc)])
        const iq = new Set([keyOf(sr, sc)])
        setVisited(new Set(v))
        setInQueue(new Set(iq))
        setQueueView([[sr, sc]])
        while (q.length && runningRef.current) {
            const delay = Math.max(40, 520 / speedRef.current)
            await sleep(delay)
            const [r, c] = q.shift()
            const k = keyOf(r,c)
            iq.delete(k)
            setInQueue(new Set(iq))
            setQueueView(q.slice())
            if (r === gr && c === gc) {
                reconstructPath(parent, k)
                setReached(true)
                break
            }
            const neighbors = [[r-1,c],[r+1,c],[r,c-1],[r,c+1]]
            for (const [nr, nc] of neighbors) {
                if (!grid[nr] || !grid[nr][nc]) continue
                if (grid[nr][nc].wall) continue
                const nk = keyOf(nr,nc)
                if (v.has(nk)) continue
                v.add(nk)
                parent.set(nk, k)
                q.push([nr,nc])
                iq.add(nk)
                setVisited(new Set(v))
                setInQueue(new Set(iq))
                setQueueView(q.slice())
            }
        }
        setIsRunning(false); runningRef.current = false
    }

    const generateGraph = (n)=>{
        const width = 520
        const height = 260
        const padding = 24
        const nodes = Array.from({length: n}, (_, i)=>({
            id: i,
            x: padding + Math.random() * (width - padding*2),
            y: padding + Math.random() * (height - padding*2)
        }))
        const adj = {}
        for (let i=0;i<n;i++) adj[i]=[]
        for (let i=1;i<n;i++) {
            const j = Math.floor(Math.random()*i)
            adj[i].push(j); adj[j].push(i)
        }
        for (let k=0;k<Math.floor(n*0.6);k++){
            const a = Math.floor(Math.random()*n)
            const b = Math.floor(Math.random()*n)
            if (a!==b && !adj[a].includes(b)) { adj[a].push(b); adj[b].push(a) }
        }
        setGraphNodes(nodes)
        setGraphAdj(adj)
        setGStart(0)
        setGGoal(n-1)
        setGVisited(new Set())
        setGInQueue(new Set())
        setGQueueView([])
        setGPath(new Set())
        setReached(false)
    }

    const reconstructGraphPath = (parentMap, endId)=>{
        const p = new Set()
        let k = endId
        while (k !== undefined && parentMap.has(k)) {
            p.add(k)
            k = parentMap.get(k)
        }
        p.add(gStart)
        setGPath(p)
    }

    const bfsGraph = async ()=>{
        const q = [gStart]
        const parent = new Map()
        const v = new Set([gStart])
        const iq = new Set([gStart])
        setGVisited(new Set(v))
        setGInQueue(new Set(iq))
        setGQueueView(q.slice())
        while (q.length && runningRef.current) {
            const delay = Math.max(40, 520 / speedRef.current)
            await sleep(delay)
            const node = q.shift()
            iq.delete(node)
            setGInQueue(new Set(iq))
            setGQueueView(q.slice())
            if (node === gGoal) {
                reconstructGraphPath(parent, node)
                setReached(true)
                break
            }
            const neighbors = graphAdj[node] || []
            for (const nb of neighbors) {
                if (v.has(nb)) continue
                v.add(nb)
                parent.set(nb, node)
                q.push(nb)
                iq.add(nb)
                setGVisited(new Set(v))
                setGInQueue(new Set(iq))
                setGQueueView(q.slice())
            }
        }
        setIsRunning(false); runningRef.current = false
    }

    return (
        <div>
            <Title>{title} Visualization</Title>
            <Panel>
                <Row $two>
                    <PrimaryButton disabled={isRunning} onClick={()=> setMode(m=> m==='grid' ? 'graph' : 'grid') }>
                        Switch to {mode==='grid' ? 'Graph' : 'Grid'}
                    </PrimaryButton>
                    <SuccessButton disabled={isRunning} onClick={async()=>{
                        if (isRunning) return
                        setReached(false)
                        if (mode==='grid') {
                            setVisited(new Set())
                            setPath(new Set())
                            setInQueue(new Set())
                            setQueueView([])
                        } else {
                            setGVisited(new Set())
                            setGPath(new Set())
                            setGInQueue(new Set())
                            setGQueueView([])
                        }
                        setIsRunning(true); runningRef.current = true
                        if (mode==='grid') { await bfs() } else { await bfsGraph() }
                    }}>Start {title}</SuccessButton>
                </Row>
                <Row>
                    {mode==='grid' ? (
                        <DarkButton disabled={isRunning} onClick={()=>buildGrid(true)}>Generate Grid</DarkButton>
                    ) : (
                        <DarkButton disabled={isRunning} onClick={()=>generateGraph(12)}>Generate Graph</DarkButton>
                    )}
                    <DangerButton onClick={()=>{
                        runningRef.current = false
                        setIsRunning(false)
                        if (mode==='grid') buildGrid(false); else generateGraph(graphNodes.length || 12)
                    }}>Reset</DangerButton>
                    <Label>Speed:</Label>
                    <Slider type="range" min="1" max="5" step="1" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} />
                    <Multiplier>{speed}x</Multiplier>
                </Row>
                <VisualArea>
                    <Meta>
                        {mode==='grid' ? (
                            <>
                                <Badge>Rows: {rows}</Badge>
                                <Badge>Cols: {cols}</Badge>
                            </>
                        ) : (
                            <>
                                <Badge>Nodes: {graphNodes.length}</Badge>
                                <Badge>Edges: {Object.values(graphAdj).reduce((s,a)=>s+(a?.length||0),0)/2}</Badge>
                            </>
                        )}
                        {reached && <Badge $success>Goal reached</Badge>}
                        {!reached && isRunning && <Badge>Exploring</Badge>}
                    </Meta>
                    <GridAndQueue>
                        {mode==='grid' ? (
                            <Grid $cols={cols}>
                                {grid.map((row, r)=> (
                                    <React.Fragment key={`r-${r}`}>
                                        {row.map((cell)=>{
                                            const k = keyOf(cell.r, cell.c)
                                            const isStart = cell.r===start[0] && cell.c===start[1]
                                            const isGoal = cell.r===goal[0] && cell.c===goal[1]
                                            return (
                                                <Cell
                                                    key={k}
                                                    $wall={cell.wall}
                                                    $start={isStart}
                                                    $goal={isGoal}
                                                    $visited={visited.has(k)}
                                                    $inQueue={inQueue.has(k)}
                                                    $path={path.has(k)}
                                                    onClick={()=>{
                                                        if (isRunning) return
                                                        if (isStart) return
                                                        if (isGoal) return
                                                        const ng = grid.map(row=>row.map(c=> ({...c})))
                                                        const toggled = !ng[cell.r][cell.c].wall
                                                        ng[cell.r][cell.c].wall = toggled
                                                        setGrid(ng)
                                                    }}
                                                />
                                            )
                                        })}
                                    </React.Fragment>
                                ))}
                            </Grid>
                        ) : (
                            <SvgWrap>
                                <Svg viewBox="0 0 560 300" preserveAspectRatio="xMidYMid meet">
                                    {graphNodes.map(n=> (
                                        (graphAdj[n.id]||[]).filter(m=> m>n.id).map(m=>{
                                            const t = graphNodes[m]
                                            const active = gPath.has(n.id) && gPath.has(m)
                                            return (
                                                <line key={`e-${n.id}-${m}`} x1={n.x} y1={n.y} x2={t.x} y2={t.y}
                                                      stroke={active ? 'rgba(0, 218, 145, 0.65)' : 'rgba(255,255,255,0.25)'}
                                                      strokeWidth={active ? 3 : 1.5} />
                                            )
                                        })
                                    ))}
                                    {graphNodes.map(n=>{
                                        const isStart = n.id===gStart
                                        const isGoal = n.id===gGoal
                                        const visitedNode = gVisited.has(n.id)
                                        const inQ = gInQueue.has(n.id)
                                        const inPath = gPath.has(n.id)
                                        return (
                                            <g key={`n-${n.id}`} onClick={()=>{
                                                if (isRunning) return
                                                if (isStart || isGoal) return
                                                if (Math.random()<0.5) setGStart(n.id); else setGGoal(n.id)
                                            }}>
                                                <circle cx={n.x} cy={n.y} r={12}
                                                        fill={inPath ? 'rgba(0, 218, 145, 0.80)' : (isStart ? 'rgba(59,130,246,0.85)' : (isGoal ? 'rgba(168,85,247,0.85)' : (visitedNode ? 'rgba(16,185,129,0.35)' : (inQ ? 'rgba(245,158,11,0.40)' : 'rgba(255,255,255,0.18)'))))}
                                                        stroke={inQ ? '#f59e0b' : 'rgba(255,255,255,0.35)'}
                                                        strokeWidth={inQ ? 2 : 1} />
                                                <text x={n.x} y={n.y+4} fontSize="10" textAnchor="middle" fill="#fff">{n.id}</text>
                                            </g>
                                        )
                                    })}
                                </Svg>
                            </SvgWrap>
                        )}
                        <QueuePanel>
                            <QueueTitle>Queue</QueueTitle>
                            <QueueItems>
                                {mode==='grid' ? (
                                    queueView.map(([r,c], idx)=> (
                                        <QueueItem key={`${idx}-${r}-${c}`}>{r},{c}</QueueItem>
                                    ))
                                ) : (
                                    gQueueView.map((id, idx)=> (
                                        <QueueItem key={`${idx}-${id}`}>#{id}</QueueItem>
                                    ))
                                )}
                                {((mode==='grid' ? queueView.length : gQueueView.length)===0) && <QueuePlaceholder>Empty</QueuePlaceholder>}
                            </QueueItems>
                        </QueuePanel>
                    </GridAndQueue>
                </VisualArea>
            </Panel>
        </div>
    )
}

export default BreadthFirstSearch

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
    grid-template-columns: ${({ $two, $align }) => $two ? '1fr 1fr' : ($align === 'center' ? 'auto 1fr auto' : 'auto auto auto 1fr auto')};
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
        ${({ $success }) => ($success ? 'rgba(16,185,129,0.45)' : 'rgba(255,255,255,0.18)')};
    background:
        ${({ $success }) => ($success ? 'rgba(16,185,129,0.22)' : 'rgba(255,255,255,0.08)')};
    color:
        ${({ $success }) => ($success ? '#bbf7d0' : '#ffffff')};
    padding: 6px 10px;
    border-radius: 9999px;
    font-size: 12px;
`

const GridAndQueue = styled.div`
    display: grid;
    grid-template-columns: 1fr 240px;
    gap: 12px;
    align-items: stretch;
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${({ $cols }) => $cols}, 24px);
    gap: 6px;
    padding: 12px;
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
    justify-content: center;
`

const SvgWrap = styled.div`
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
    padding: 8px;
`

const Svg = styled.svg`
    width: 100%;
    height: 300px;
    display: block;
    border-radius: 6px;
`

const Cell = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.18);
    background:
        ${({ $wall, $start, $goal, $path, $visited, $inQueue }) => $wall
            ? 'rgba(255, 255, 255, 0.12)'
            : ($path
                ? 'rgba(0, 218, 145, 0.54)'
                : ($start
                    ? 'rgba(59,130,246,0.70)'
                    : ($goal
                        ? 'rgba(168,85,247,0.65)'
                        : ($visited
                            ? 'rgba(16,185,129,0.22)'
                            : ($inQueue ? 'rgba(245,158,11,0.28)' : 'rgba(255,255,255,0.08)')))))};
    outline: ${({ $inQueue }) => $inQueue ? '2px solid #f59e0b' : 'none'};
    box-shadow: ${({ $inQueue }) => $inQueue ? '0 0 0 2px rgba(245,158,11,0.2)' : 'none'};
    transition: background-color 180ms ease;
    cursor: pointer;
`

const QueuePanel = styled.div`
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 10px;
    min-height: 120px;
`

const QueueTitle = styled.div`
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 8px;
`

const QueueItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`

const QueueItem = styled.span`
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.08);
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 9999px;
    font-size: 12px;
`

const QueuePlaceholder = styled.div`
    color: rgba(229,231,235,0.6);
    font-size: 12px;
`


