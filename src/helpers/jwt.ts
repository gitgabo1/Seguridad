import { expressjwt } from "express-jwt";
import { error_handler } from "./error_handler";
const secretKey="Gabriel";
const api  = "/api/v1";
const authJwt=expressjwt({
    secret:secretKey!,
    algorithms:['HS256'],
}).unless({
    path: [
        //{url:/\/api\/v1\/product(.*)/,methods:['GET','OPTIONS']},
        `${api}/user/login`,
        `${api}/user/register`

    ]
})
export default authJwt;
