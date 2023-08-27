import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import Task from '../../Models/Task';

export default class TasksController {
    public async index(){
        return Task.all()
    };

    public async store({ request, response }: HttpContextContract){
        const newTaskShema = schema.create({
            userId: schema.string({ trim: true }),
            name: schema.string({ trim: true }),
            color: schema.string({ trim: true }),
            limitAt: schema.date()
        });
        const payload = await request.validate({ schema: newTaskShema });
        const task = await Task.create(payload);
        response.status(201);
        return task;
    };

    public async show({ params }: HttpContextContract){
        return Task.findOrFail(params.id);
    };

    public async update({ params, request }: HttpContextContract){
        const body = request.body();
        const task = await Task.findOrFail(params.id);
        if(body.name){
            task.name = body.name;
        };
        if(body.state){
            task.state = body.state;
        }
        if(body.color){
            task.color = body.color;
        };
        if(body.limitAt){
            task.limitAt = body.limitAt;
        }
        return task.save();
    };

    public async destroy({ params, response }: HttpContextContract){
        const task = await Task.findOrFail(params.id);
        await task.delete();    
        response.status(200).json({ message: 'Task deleted successfully', task });
    };
};
