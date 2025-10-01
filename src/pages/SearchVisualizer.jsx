import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/footer'
import SelectVisualizer from '../components/SelectVisualizer'

function SearchVisualizer() {
    return (
      <div>
        <Header />
        <SelectVisualizer />
        <Footer />
      </div>
    )
}

export default SearchVisualizer