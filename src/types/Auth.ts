import { Request } from "express";

import { IUser } from "models";

export interface AuthRequest<Param, ResBody, ReqBody, ReqQuery>
  extends Request<Param, ResBody, ReqBody, ReqQuery> {
  user: IUser;
}
