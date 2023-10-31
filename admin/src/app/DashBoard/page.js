"use client"
import React, { useEffect } from 'react';
import "../../styles/dashboard/page.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews,selectReviews } from '@/Redux/adminSlice';
const Dashboard = () => {
    const dispatch=useDispatch()
    const ReviewData = useSelector( selectReviews)
    console.log(ReviewData);
    useEffect(()=>{
        dispatch(fetchReviews())
    },[dispatch])
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
