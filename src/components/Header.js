import React, {Component} from 'react'
import './Header.css';

export default function Header() {
        return(
            <header className="app-header">
                <h1 className='app-header-title'>TI Turn Tracker</h1>
                <h4 className='app-header-subtitle'>An unofficial tool for Twilight Imperium</h4>
            </header>
        )   
}