import React, { useState } from 'react';
import { addTask } from '../db';

const TaskForm = ({ onTaskAdded }) => {
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !deadline) return;

        try {
            await addTask({
                description,
                deadline,
                createdAt: new Date()
            });

            setDescription('');
            setDeadline('');
            if (onTaskAdded) onTaskAdded(); // Refresh list
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Add New Task</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary">
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
