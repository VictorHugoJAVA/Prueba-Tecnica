import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskForm.css'; // Importa los estilos

function TaskForm({task, onTaskAdded, onTaskUpdated ,onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pendiente',
        due_date: '',
    });

    useEffect(() => {
        if (task) {
            setFormData(task);
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'pendiente',
                due_date: '',
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task) {
            axios.put(`/api/tasks/${task.id}`, formData)
                .then((response) => {
                    onTaskUpdated(response.data);
                })
                .catch((error) => {
                    console.error('Error al actualizar tarea:', error);
                });
        }
        else{
            axios.post('/api/tasks', formData)
            .then((response) => {
                if (response.data) {
                    onTaskAdded(response.data);
                    setFormData({
                        title: '',
                        description: '',
                        status: 'pendiente',
                        due_date: '',
                    });
                }
                console.log("Respuesta de la API:", response.data.data);
              
               
            })
            .catch((error) => {
                console.error('Error al agregar tarea:', error);
                // Manejar el error
            });
        }
      
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
            <button type="submit">{task ? 'Guardar' : 'Agregar'}</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
        </form>
    );
}

export default TaskForm;