import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import Task from '../../Models/Task';

export default class TasksController {
    public async index({ response }){
        try {
            return Task.all()            
        } catch (error) {
            return response.status(404).json({ message: 'An error has occurred' })
        }
    }

    public async store({ request, response }: HttpContextContract){
        try {
            const newTaskShema = schema.create({
                userId: schema.string({ trim: true }),
                name: schema.string({ trim: true }),
                color: schema.string({ trim: true }),
                limitAt: schema.date()
            });
            const payload = await request.validate({ schema: newTaskShema })
            const task = await Task.create(payload)
            response.status(201)
            return task
        } catch (error) {
            return response.status(404).json({ message: 'An error has occurred' })
        }
    }

    public async show({ params, response }: HttpContextContract){
        try {
            return Task.findOrFail(params.id)           
        } catch (error) {
            return response.status(404).json({ message: 'An error has occurred' })
        }
    }

    public async update({ params, request, response }: HttpContextContract){
        try {
            const body = request.body();
            const task = await Task.findOrFail(params.id)
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
            return task.save()
        } catch (error) {
            return response.status(404).json({ message: 'An error has occurred' })
        }
    }

    public async destroy({ params, response }: HttpContextContract){
        try {
            const task = await Task.findOrFail(params.id);
            await task.delete();
            response.status(200).json({ message: 'Task deleted successfully', task })
        } catch (error) {
            return response.status(404).json({ message: 'An error has occurred' })            
        }
    }
}
