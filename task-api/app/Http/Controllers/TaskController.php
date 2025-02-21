<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    //maneja las solicitudes get a la ruta tasks e inyecta la instancia de la solicitud http
    public function index(Request $request)
    {
        $query= Task::query(); //crea una consulta eloquent para el modelom task
        
        //verifica si la solicitud contiene el parametro
        if ($request->has('status')) {
            //filtra las tareas por estado
            $query->where('status',$request->status);
        }
        $tasks=$query->paginate(10);//paginacion
        return response()->json($tasks);
    }

    //este metodo maneja las solicitudes POST a la ruta /tasks
    public function store(Request $request)
    {
        $task=Task::create($request->all());
        return response()->json($task,201);
    }

    //este metodo maneja las solicitudes GET 
    public function show(Task $task){
        return response()->json($task);
    }

    //maneja las solicitudes PUT/PATCH
    public function update (Request $request, Task $task ){
        $task->update($request->all());
        return response()->json($task);
    }

    //maneja las solicitudes delete
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null,204);
    }
}
