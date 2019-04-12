import React, {Component} from 'react'
import './Header.css';

export default function Header() {
        return(
            <div>
                <header className="app-header">
                    <div>
                        <h1 className='app-header-title'>Imperium Tracker</h1>
                        <h4 className='app-header-subtitle'>An unofficial tool for...</h4>
                    </div>
                    <img className='twilight-png' src='http://i236.photobucket.com/albums/ff4/MrBlarney/TwilightImperium/TwilightImperium4e_Logo.png~original'/>
                </header>
                <nav className='header-sub-pax'>PAX MAGNIFICA BELLUM GLORIOSUM</nav>
            </div>
        )   
}