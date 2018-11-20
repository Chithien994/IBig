/*
ChiThienTCN
topic.ts = Difine model Topic class
*/
export class Topic {
    id: number;
    user: number;
    name: string;
    picture: string;
    

    public getParams(input: Topic){
        var param = new Topic();
        param.id = +input.id;
        param.user = +input.user;
        param.name = input.name;
        return param;
    }
}