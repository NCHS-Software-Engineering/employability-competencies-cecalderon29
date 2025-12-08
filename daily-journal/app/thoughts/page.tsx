"use client";
import React, { useState, useEffect } from "react";

type Thought = {
    text: string;
    time: string;
    competencies: number[];
};

type Competency = {
    id: number;
    skill: string;
    description: string;
};

export default function thoughts() {
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [competencies, setCompetencies] = useState<Competency[]>([]);
    
    // Load thoughts from localStorage on page load
    useEffect(() => {
        const savedThoughts = localStorage.getItem("dailyThoughts");
        if (savedThoughts) {
            setThoughts(JSON.parse(savedThoughts));
        }
    }, []); // Empty dependency array = runs only once on component mount

    useEffect(() => {
            async function fetchCompetencies() {
                const res = await fetch("/api/competencies");
                const data = await res.json();
                setCompetencies(data);
            }
            fetchCompetencies();
    }, []);

    return (
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md mt-5">
            <h2 className="text-2xl font-bold mb-4 text-[#ff0000]">All My Thoughts</h2>
            <div className="space-y-4">
                    {thoughts.length === 0 ? (<p className="italic text-center">No thoughts yet. Start typing!</p>) : (
                        thoughts.map((thought, index) => (
                            <div 
                                key={index}
                                className="bg-white/20 p-3 rounded-lg shadow-sm">
                                <p className="text-lg">{thought.text}</p>
                                <p className="text-sm opacity-80 mt-1">{thought.time}</p>
                                {thought.competencies.length > 0 && (
                                <p className="text-sm mt-1">
                                    <strong>Competencies: </strong>
                                    {thought.competencies.map((id) =>
                                        competencies.find((c) => c.id === id)?.skill || `#${id}`).join(", ")
            
                                    }
                                </p>
                            )}      
                            </div>
                        ))
                    )}
                </div>
        </div>
    );
}