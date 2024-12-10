import React from 'react'
import Hero from './Hero'
import Categories from './Category'
import FeaturedJobs from './Feature'
import Stats from './Stats'

function Home() {
    return (
        <div>
            <Hero />
            <Categories />
            <FeaturedJobs />
            <Stats />
        </div>
    )
}

export default Home