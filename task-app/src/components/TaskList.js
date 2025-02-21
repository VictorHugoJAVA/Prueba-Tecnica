import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';
import EditTaskForm from './EditTaskForm';
import TaskForm from './TaskForm';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('/api/tasks')
            .then((response) => {
                setTasks(response.data.data);
            })
            .catch((error) => {
                console.error('Error al obtener tareas:', error);
                // Manejar el error
            });
    };





    const handleAddTaskClick = () => {
        setShowForm(true); // Muestra el formulario al hacer clic en "Agregar Tarea"
    };

    const handleTaskAdded = (newTask) => {

        setTasks([...tasks, newTask]); // Agrega tareas
        setShowForm(false); // Oculta el formulario después de agregar la tarea
    };


    const handleEdit = (task) => {



        setEditingTask(task);
        console.log(`Editar tarea con id: ${task}`);
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setEditingTask(null);
    };

    const handleCancelEdit = () => {
        setEditingTask(null); // Cancela la edición
    };


    const handleDelete = (taskId) => {

        axios.delete(`/api/tasks/${taskId}`)
            .then(() => {
                setTasks(tasks.filter((task) => task.id !== taskId));
            })
            .catch((error) => {
                console.error('Error al eliminar tarea:', error);

            });
        console.log(`Eliminar tarea con ID: ${taskId}`);
    };

    const handleCancelAddTask = () => {
        setShowForm(false); // Oculta el formulario al cancelar
    };


    return (
        <div>
            <h2>Lista de Tareas</h2>
            <button id="agregar" onClick={handleAddTaskClick}>Agregar Tarea</button> {/* Botón "Agregar Tarea" */}
            {showForm && (<TaskForm onTaskAdded={handleTaskAdded} onCancel={editingTask ? handleCancelEdit : handleCancelAddTask} // Determina la función de cancelación
            />
            )}
            {editingTask && (
                <EditTaskForm
                    task={editingTask}
                    onTaskUpdated={handleUpdateTask}
                    onCancel={handleCancelEdit}
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Feha de creación</th>
                        <th>Fecha Límite</th>
                        <th>Fecha de modificación</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.created_at}</td>
                            <td>{task.due_date}</td>
                            <td>{task.updated_at}</td>
                            <td> <button id="editar" onClick={() => handleEdit(task.id)}>Editar</button>
                                <button id="borrar" onClick={() => handleDelete(task.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;