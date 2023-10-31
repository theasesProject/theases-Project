import React from 'react';
import "../../styles/dashboard/page.css"
const Dashboard = () => {
    return (
        <div className="container">
            <h1 className="title">Dashboard</h1>
            <p className="welcome">Welcome to your special dashboard!</p>
            <div className="card">
                <h2>Your Data</h2>
                <p>Here's where we'll show some interesting data...</p>
            </div>
        </div>
    );
}

export default Dashboard;
