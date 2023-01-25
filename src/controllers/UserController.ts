import { Request, Response } from "express";
import IController from "./Controller_Interface";

let data: any[] = [
    { id: 1, name: "udin" },
    { id: 2, name: "ajeng" },
    { id: 3, name: "dedi" },
    { id: 4, name: "bambang" },
    { id: 5, name: "agung" },
];

class UserController implements IController {
    index(req: Request, res: Response): Response {
        return res.send(data);
    }

    create(req: Request, res: Response): Response {
        const { id, name } = req.body;

        data.push({ id, name });

        return res.send("create sukses");
    }

    show(req: Request, res: Response): Response {
        const { id } = req.params;

        let person = data.find(item => item.id == id);
        return res.send(person);
    }

    update(req: Request, res: Response): Response {
        const { id } = req.params;
        const { name } = req.body;

        let person = data.find(item => item.id == id);
        person.name = name;

        return res.send("updated sukses");
    }

    delete(req: Request, res: Response): Response {
        const { id } = req.params;

        let people = data.filter(item => item.id != id);
        
        return res.send(people);
    }

}
export default new UserController();