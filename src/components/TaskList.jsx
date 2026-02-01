import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask } from '../db';

const TaskList = ({ refreshTrigger }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const allTasks = await getAllTasks();
            // Sort: closest deadline first
            allTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            setTasks(allTasks);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(id);
            fetchTasks();
        }
    };

    const getDeadlineColor = (deadlineDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today
        const due = new Date(deadlineDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'var(--danger-color)'; // Overdue (Red)
        if (diffDays <= 3) return 'var(--warning-color)'; // Near (Orangeish - using Amber) -- instruction said Orange 
        if (diffDays <= 7) return '#facc15'; // Week (Yellow)
        return 'var(--success-color)'; // Safe
    };

    const getStatusText = (deadlineDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(deadlineDate);
        const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due Today';
        if (diffDays === 1) return 'Tomorrow';
        return `${diffDays} days left`;
    }

    return (
        <div className="glass-panel">
            <h3 style={{ marginBottom: '1rem' }}>My Tasks ({tasks.length})</h3>
            {tasks.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No tasks yet. Add one above!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map((task) => (
                        <li key={task.id} style={{
                            background: 'rgba(255,255,255,0.05)',
                            marginBottom: '0.75rem',
                            padding: '1rem',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: `4px solid ${getDeadlineColor(task.deadline)}`
                        }}>
                            <div>
                                <p style={{ fontWeight: 500, fontSize: '1.05rem' }}>{task.description}</p>
                                <span style={{
                                    fontSize: '0.85rem',
                                    color: getDeadlineColor(task.deadline),
                                    marginTop: '0.25rem',
                                    display: 'inline-block'
                                }}>
                                    {new Date(task.deadline).toLocaleDateString()} — {getStatusText(task.deadline)}
                                </span>
                            </div>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="btn-icon"
                                aria-label="Delete task"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
