import React from 'react';
import './home-page.css';
import Questionnaire from '../components/questionnaire';

export default class HomePage extends React.Component {
    render(){
        return (
            <div className='home-container'>
                <div className='title-box'>
                    <p className='home-mainheading'>Challenge Software Engineer Microservices</p>
                    <p className='home-subheading'>Survey for Weekly Beer Consumption</p>
                </div>
                {/* Rendering of Resuable Questionnaire Component */}
                <Questionnaire />
            </div>
        );
    }
}
