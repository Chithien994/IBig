/*
ChiThienTCN
topic.ts = Difine model Topic class
*/
export class Topic {
    id: number;
    user: number;
    name: string;
    picture: string;
    

    public getParams(id: number, user: number, name: string){
        const param = new Topic();
        param.id = id;
        param.user = user;
        param.name = name;
        return param;
    }
}