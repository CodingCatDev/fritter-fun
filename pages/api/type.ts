import { NextApiRequest, NextApiResponse } from "next";
import types from '../../data/types.json';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
res.json(types);
}