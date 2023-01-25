import { Request, Response } from "express";
import TodoService from "../services/TodoService";
import IController from "./Controller_Interface";

class TodoController implements IController {

    index = async (req: Request, res: Response): Promise<Response> => {
        const services: TodoService = new TodoService(req);
        const todo = await services.getAll();

        return res.send({
            data: todo,
            message: ""
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const services: TodoService = new TodoService(req);
        const todo = await services.store();

        return res.send({
            data: todo,
            message: "todo created"
        });
    }

    show = async (req: Request, res: Response): Promise<Response> => {
        const services: TodoService = new TodoService(req);
        const todo = await services.getOne();

        return res.send({
            data: todo,
            message: ""
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const services: TodoService = new TodoService(req);
        const todo = await services.updated();

        return res.send({
            data: todo,
            message: "todo updated"
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const services: TodoService = new TodoService(req);
        const todo = await services.delete();

        return res.send({
            data: todo,
            message: "todo delete"
        });
    }

}
export default new TodoController();