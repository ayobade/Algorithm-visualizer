import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function SelectVisualizer() {
    const [activeTab, setActiveTab] = useState('Sorting')
    const [query, setQuery] = useState('')

    const data = useMemo(() => ({
        Sorting: [
            { title: 'Bubble Sort', level: 'Beginner', items: ['Compare neighbors and swap'], active: true },
            { title: 'Selection Sort', level: 'Beginner', items: ['Pick the smallest each time'], active: true },
            { title: 'Insertion Sort', level: 'Beginner', items: ['Insert into the right spot'], active: false },
            { title: 'Merge Sort', level: 'Intermediate', items: ['Split in half, then merge'], active: false },
            { title: 'Quick Sort', level: 'Intermediate', items: ['Pick a pivot and divide'], active: false },
            { title: 'Heap Sort', level: 'Advanced', items: ['Use a tree-like heap to sort'], active: false },
            { title: 'Counting / Radix', level: 'Intermediate', items: ['Group by values or digits'], active: false },
          ],
          
          Searching: [
            { title: 'Linear Search', level: 'Beginner', items: ['Check each element one by one'], active: true },
            { title: 'Binary Search', level: 'Beginner', items: ['Cut the list in half each time'], active: false },
            { title: 'Jump / Interpolation', level: 'Intermediate', items: ['Skip ahead or guess position'], active: false },
          ],
          
          Graphs: [
            { title: 'BFS', level: 'Beginner', items: ['Explore layer by layer'], active: false },
            { title: 'DFS', level: 'Beginner', items: ['Go deep before backtracking'], active: false },
            { title: 'Dijkstra', level: 'Intermediate', items: ['Find shortest weighted path'], active: false },
            { title: 'A*', level: 'Advanced', items: ['Smart pathfinding with guesses'], active: false },
            { title: 'MST (Kruskal / Prim)', level: 'Intermediate', items: ['Connect all nodes with smallest total weight'], active: false },
          ],
          
          DP: [
            { title: 'Fibonacci', level: 'Beginner', items: ['Build up from smaller results'], active: false },
            { title: 'LCS / Knapsack', level: 'Intermediate', items: ['Fill a grid to find answers'], active: false },
          ],
          
    }), [])

    const filtered = useMemo(() => {
        const items = data[activeTab] || []
        if (!query.trim()) return items
        const q = query.toLowerCase()
        return items.filter(x => x.title.toLowerCase().includes(q) || x.items.join(' ').toLowerCase().includes(q))
    }, [data, activeTab, query])
    return (
        <Section>
            <Inner>
                <Heading>
                    Algorithm <Accent>Visualizer</Accent>
                </Heading>
                <Sub>
                    Interactive visual representations of computer science concepts
                </Sub>
                <SearchBar>
                    <Input type="text" placeholder="Search for algorithms..." value={query} onChange={(e)=>setQuery(e.target.value)} />
                    <IconBtn aria-label="search">
                        <SearchSvg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/>
                        </SearchSvg>
                    </IconBtn>
                </SearchBar>

                <TabBar>
                    {['Sorting', 'Searching', 'Graphs', 'DP'].map(tab => (
                        <TabButton key={tab} $active={activeTab===tab} onClick={()=>setActiveTab(tab)}>{tab}</TabButton>
                    ))}
                </TabBar>

                <Cards>
                    {filtered.map((alg) => (
                        <Card key={alg.title} $dimmed={!alg.active}>
                            <CardHeader>
                                <IconCircle>
                                    {activeTab === 'Sorting' && (<BarsIcon viewBox="0 0 24 24"><path d="M5 3h2v18H5zM11 8h2v13h-2zM17 13h2v8h-2z"/></BarsIcon>)}
                                    {activeTab === 'Searching' && (<SearchSvg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/></SearchSvg>)}
                                    {activeTab === 'Graphs' && (<PathIcon viewBox="0 0 24 24"><path d="M5 6a3 3 0 0 1 6 0v2h2a4 4 0 0 1 0 8H9v2a3 3 0 1 1-2 0v-4h6a2 2 0 0 0 0-4H9V6a3 3 0 0 1-4-0Z"/></PathIcon>)}
                                    {activeTab === 'DP' && (<GridIcon viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></GridIcon>)}
                                </IconCircle>
                                <CardTitle>{alg.title}</CardTitle>
                                <Level $level={alg.level}>{alg.level==='Beginner'?'🟢':alg.level==='Intermediate'?'🟡':'🔴'} {alg.level}</Level>
                            </CardHeader>
                            <CardList>
                                {alg.items.map((t) => (<li key={t}>{t}</li>))}
                            </CardList>
                            <ActionsRow>
                                {alg.active ? (
                                    <PrimaryLink to="/Visualizer" state={{ title: alg.title }}>Open</PrimaryLink>
                                ) : (
                                    <GhostDisabled as="button" disabled>Coming soon</GhostDisabled>
                                )}
                            </ActionsRow>
                        </Card>
                    ))}
                </Cards>
            </Inner>
        </Section>
    )
}

const Section = styled.section`
    width: 100%;
    padding: 64px 24px 40px;
    background: transparent;
`

const Inner = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
    color: #ffffff;
`

const Heading = styled.h1`
    font-size: clamp(2.2rem, 6vw, 4.2rem);
    font-weight: 800;
    letter-spacing: 0.2px;
`

const Accent = styled.span`
    color: #f59e0b;
`

const Sub = styled.p`
    margin-top: 16px;
    font-size: clamp(1rem, 2.2vw, 1.25rem);
    color: rgba(229,231,235,0.85);
`

const SearchBar = styled.div`
    margin: 36px auto 0;
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 14px;
    padding: 2px 12px;
    gap: 10px;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 6px 22px rgba(245, 158, 11, 0.08), inset 0 0 0 1px rgba(255,255,255,0.02);
    backdrop-filter: blur(6px);
`

const Input = styled.input`
    flex: 1;
    height: 56px;
    background: transparent;
    border: none;
    outline: none;
    color: #e5e7eb;
    font-size: 18px;
    padding: 0 12px;
    &::placeholder { color: rgba(229,231,235,0.6); }
`

const IconBtn = styled.button`
    height: 32px;
    width: 32px;
    border-radius: 9999px;
    border: 1px solid rgba(245, 158, 11, 0.45);
    background: rgba(245, 158, 11, 0.1);
    color: #ffd28a;
    cursor: pointer;
`

const SearchSvg = styled.svg`
    width: 18px;
    height: 18px;
    fill: currentColor;
`

const Cards = styled.div`
    margin: 40px auto 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    max-width: 1100px;
    @media (max-width: 960px) { grid-template-columns: 1fr; }
`

const Card = styled.div`
    background: ${({ $dimmed }) => ($dimmed ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)')};
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    padding: 18px 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    opacity: ${({ $dimmed }) => ($dimmed ? 0.65 : 1)};
    box-shadow: 0 8px 28px rgba(245, 158, 11, 0.07), inset 0 0 0 1px rgba(255,255,255,0.02);
    backdrop-filter: blur(6px);
    text-align: left;
`

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const IconCircle = styled.div`
    height: 36px;
    width: 36px;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(245, 158, 11, 0.14);
    color: #ffcc88;
    border: 1px solid rgba(245, 158, 11, 0.35);
`

const BarsIcon = styled.svg`
    width: 18px; height: 18px; fill: currentColor;
`
const PathIcon = styled.svg`
    width: 18px; height: 18px; fill: currentColor;
`
const BoxIcon = styled.svg`
    width: 18px; height: 18px; fill: currentColor;
`
const GridIcon = styled.svg`
    width: 18px; height: 18px; fill: currentColor;
`
const TextIcon = styled.svg`
    width: 18px; height: 18px; fill: currentColor;
`

const CardTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.2px;
`

const CardNote = styled.span`
    margin-left: auto;
    font-size: 12px;
    color: rgba(229,231,235,0.75);
`

const CardList = styled.ul`
    margin: 6px 0 10px;
    padding-left: 0;
    list-style: none;
    color: rgba(229,231,235,0.9);
    li { margin: 4px 0; font-size: 14px; }
`

const ActionsRow = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ButtonBase = styled(Link)`
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 14px;
    border: 1px solid rgba(245, 158, 11, 0.45);
`

const PrimaryLink = styled(ButtonBase)`
    background: #ffffff;
    color: #0b0b0b;
    border-color: #ffffff;
    transition: transform 0.2s ease;
    &:hover { transform: translateY(-1px); }
`

const GhostDisabled = styled(ButtonBase)`
    background: transparent;
    color: rgba(229,231,235,0.7);
    border-color: rgba(229,231,235,0.2);
    pointer-events: none;
`

const TabBar = styled.div`
    margin: 28px auto 10px;
    display: flex;
    gap: 10px;
    justify-content: center;
`

const TabButton = styled.button`
    padding: 10px 16px;
    border-radius: 9999px;
    border: 1px solid ${({ $active }) => ($active ? '#ffffff' : 'rgba(255,255,255,0.18)')};
    background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.12)' : 'transparent')};
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
`

const Level = styled.span`
    margin-left: auto;
    font-size: 12px;
    color: rgba(229,231,235,0.9);
`

export default SelectVisualizer

