import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskForm.css'; // Reutilizamos los estilos de TaskForm

function EditTaskForm({ task, onTaskUpdated, onCancel }) {
    console.log("Tarea recibida en EditTaskForm:", task);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pendiente',
        due_date: '',
    });

    useEffect(() => {
        if (task) {
            setFormData(task);
        }
        console.log("formData en EditTaskForm:", formData);
    }, [task]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/tasks/${task.id}`, formData)
            .then((response) => {
                onTaskUpdated(response.data);
            })
            .catch((error) => {
                console.error('Error al actualizar tarea:', error);
            });
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} />
            <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En progreso</option>
                <option value="completado">Completado</option>
            </select>
            <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
            {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
            <button type="submit">Guardar</button>
        </form>
    );
}

export default EditTaskForm;