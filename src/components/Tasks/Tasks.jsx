import React, { useEffect, useState } from 'react'
import './Tasks.css'
import { Check, Plus, RotateCcw, X } from 'lucide-react'

const Tasks = ({ tasks, setTasks }) => {
    const [filter, setFilter] = useState('all')
    const [modal, setModal] = useState(null)
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDesc, setEditedDesc] = useState('');

    const allCount = tasks.length;
    const pendingCount = tasks.filter(task => task.status === 'pending').length;
    const completedCount = tasks.filter(task => task.status === 'completed').length;


    const handleAddTask = () => {
        if (newTaskTitle.trim() === '') return;

        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            description: newTaskDesc,
            createdAt: new Date().toLocaleString(),
            status: 'pending' //initial status
        }

        const updatedTasks = [...tasks, newTask];

        const sortedTasks = [
            ...updatedTasks.filter(task => task.status === 'pending'),
            ...updatedTasks.filter(task => task.status === 'completed')
        ];

        setTasks(sortedTasks);
        setNewTaskTitle('');
        setNewTaskDesc('')
        setModal(false);
    }

    useEffect(() => {
        localStorage.setItem('myTasks', JSON.stringify(tasks))
    }, [tasks]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('myTasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'pending') return task.status === 'pending';
        if (filter === 'completed') return task.status === 'completed';
        return true;
    });

    const handleCheckToggle = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                const newStatus = task.status === 'pending' ? 'completed' : 'pending';
                return { ...task, status: newStatus };
            }
            return task;
        });

        // move completed tasks to end
        const sortedTasks = [
            ...updatedTasks.filter(task => task.status === 'pending'),
            ...updatedTasks.filter(task => task.status === 'completed')
        ];

        setTasks(sortedTasks);
    };

    const handleResetTasks = () => {
        if (window.confirm("Are you sure you want to delete all tasks?")) {
            setTasks([]);
        }
    };


    return (
        <div className='tasks card'>
            <div className="tasks-header">
                <div className="header-left">
                    <h3>Your Tasks At Hand</h3>
                    <button
                        className="add-btn"
                        onClick={() => {
                            setModal(true);
                            setNewTaskTitle('');
                            setNewTaskDesc('');
                        }}>
                        <Plus strokeWidth={2} />
                    </button>
                </div>

                <div className="header-right">
                    <button className="reset-btn" onClick={handleResetTasks}><RotateCcw size={16} /></button>
                    <select name="" id="" onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All ({allCount})</option>
                        <option value="pending">Pending ({pendingCount})</option>
                        <option value="completed">Completed ({completedCount})</option>
                    </select>
                </div>
            </div>

            {modal && (
                <div className="add-task-modal">
                    <div className="modal-header">
                        <h3>Add New Task</h3>
                        <button
                            className='close-btn'
                            onClick={() => {
                                setModal(false);
                                setNewTaskTitle('');
                                setNewTaskDesc('');
                            }}>
                            <X />
                        </button>
                    </div>

                    <div className="modal-body">
                        <input
                            type="text"
                            placeholder='Add Title'
                            className='input-title'
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            required
                            autoFocus
                        />

                        <div className="body-description">
                            <div className='description-heading'>
                                <span className='heading-span bold'>Description</span>
                                <span className="heading-span optional">(optional)</span>
                            </div>
                            <textarea
                                rows={'2'}
                                className='description-input'
                                value={newTaskDesc}
                                onChange={(e) => setNewTaskDesc(e.target.value)}
                            />
                        </div>

                        <div className="add">
                            <button className="save-btn" onClick={handleAddTask}>ADD</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="tasks-body">
                {tasks.length === 0 ? (
                    <div className="no-tasks">
                        <p>It's empty here. Create your first task!</p>
                    </div>
                ) : (
                    filteredTasks.map((task) => {
                        return (
                            <div
                                key={task.id}
                                className="task-card"
                                onClick={() => {
                                    const isCurrentlyExpanded = expandedTaskId === task.id;
                                    setExpandedTaskId(isCurrentlyExpanded ? null : task.id);
                                    if (isCurrentlyExpanded && editingTaskId === task.id) {
                                        setEditingTaskId(null);
                                    }
                                }}
                            >
                                <div className="task-card-top">
                                    <div className="task-card-right">
                                        <button
                                            className={task.status === 'pending' ? 'check-btn-pending' : 'check-btn-completed'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCheckToggle(task.id)
                                            }}
                                        >
                                            <Check className='check-icon' size={16} strokeWidth={3} />
                                        </button>
                                        {editingTaskId === task.id ? (
                                            <input
                                                type="text"
                                                className="title-edit"
                                                value={editedTitle}
                                                onChange={(e) => setEditedTitle(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                autoFocus
                                            />
                                        ) : (
                                            <span className={task.status === 'pending' ? 'title-pending' : 'title-completed'}>
                                                {task.title}
                                            </span>
                                        )}
                                    </div>
                                    <div className="task-card-left">
                                        <div className="status-indicator">
                                            <span className={`status-dot ${task.status}`} />
                                            <span className="status-text">{task.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {expandedTaskId === task.id && (
                                    <div className="task-card-bottom">
                                        <p>Created On: {task.createdAt}</p>
                                        {task.description && (
                                            <>
                                                {editingTaskId === task.id ? (
                                                    <textarea
                                                        className="description-input"
                                                        rows={2}
                                                        value={editedDesc}
                                                        onChange={(e) => setEditedDesc(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <div className="description-box">
                                                        <p>{task.description}</p>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        <div className="task-card-actions">
                                            {editingTaskId === task.id ? (
                                                <>
                                                    <button
                                                        className="card-actions save"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const updatedTasks = tasks.map(t =>
                                                                t.id === task.id ? { ...t, title: editedTitle, description: editedDesc } : t
                                                            );
                                                            setTasks(updatedTasks);
                                                            setEditingTaskId(null);
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="card-actions cancel"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingTaskId(null);
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="card-actions edit"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingTaskId(task.id);
                                                            setEditedTitle(task.title);
                                                            setEditedDesc(task.description || '');
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="card-actions delete"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setTasks(tasks.filter(t => t.id !== task.id));
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Tasks