import { NextApiRequest, NextApiResponse } from "next";
import { Donut } from "../../models/Donuts";
import donuts from '../../data/donuts.json';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

const type: string = req.query?.donuts?.[1];
let ds: Donut[] = (donuts as unknown) as Donut[];
if (type) {
    const types = type.split(',');
    ds = ds.filter((donut) =>
        donut.types.reduce((acc:any, type:any) => {
            return acc || types.includes(type);
        }, false),
    );
}
res.json(ds);
}