import { createContext, useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import InfoCard from "../InfoCard/InfoCard"
import Search from "../Search/Search"
import Login from "../auth/Login"

import Header from './Header/Header'
import Footer from './Footer/Footer'
import Modal from '../modal/Modal'

import './Layout.css'

const SearchContext = createContext()

export default function Layout() {
    const [search, setSearch] = useState()
    console.log('rendering layout...')
    const location = useLocation()
    const isExplorePage = location.pathname === '/explore'
    console.log('location.pathname: ', location.pathname)

    const onLoginClick = () => {
        console.log('onLoginClick')
    }

    return (
        <SearchContext.Provider value={{search}}>
            <Header onLoginClick={() => onLoginClick} />
            <main>
                <section className="hero">
                    <div className="hero__cover container">
                        <h1 className="title">
                            Find Your Next <span className="title--accent">Adventure</span>
                        </h1>
                        <p className={`hero__description ${isExplorePage && 'explore'}`}>
                            Your next hiking adventure awaits. Get on the trail with detailed maps and updates shared by hikers like you.
                        </p>
                        <div className="search-container">
                            {location.pathname === '/' && <Search searchCb={setSearch} />}
                        </div>
                    </div>
                </section>
                <Outlet />
                <section className="more-info container">
                    <InfoCard
                        iconSrc="/src/assets/bell.png"
                        title="Sign up for Notifications">
                        <Link to="/signup">Sign up</Link> to get conditions alerts, information on pop-up events and interesting stories.
                    </InfoCard>
                    <InfoCard
                        iconSrc="/src/assets/location.png"
                        title="Get the HikeFinder App">
                        <Link to="/">Download the app</Link> to get the most out of every minute outdoors with offline maps and more!
                    </InfoCard>
                    <InfoCard
                        iconSrc="/src/assets/share.png"
                        title="Share Trails">
                        <Link to="/">Share your hiking adventures</Link> with the community and keep a record of your travels.
                    </InfoCard>
                </section>
            </main>
            <Footer />
            <Modal>
                <Login></Login>
            </Modal>
        </SearchContext.Provider>
    )
}

export { SearchContext }