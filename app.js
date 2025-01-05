function TodoApp() {
    const [tasks, setTasks] = React.useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [task, setTask] = React.useState("");
    const [date, setDate] = React.useState("");

    React.useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]); // Save tasks to localStorage whenever tasks change

    const addTask = () => {
        if (task && date) {
            setTasks([...tasks, { task, date }]);
            setTask("");
            setDate("");
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const highlightTask = (e) => {
        e.target.style.backgroundColor = '#d1e7dd';
        e.target.style.transition = '0.3s';
    };

    const unhighlightTask = (e) => {
        e.target.style.backgroundColor = '#e9ecef';
    };

    return (
        <div>
            <h1>TO DO LIST</h1>
            <input 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter the task" 
            />
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={addTask}>Add</button>

            <div className="task-grid">
                {tasks.map((item, index) => (
                    <div 
                        className="task-item" 
                        key={index}
                        onMouseEnter={highlightTask}
                        onMouseLeave={unhighlightTask}
                    >
                        <p><strong>{item.task}</strong></p>
                        <p>{item.date}</p>
                        <button className="delete-btn" onClick={() => deleteTask(index)}>DELETE</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TodoApp />);