import { Request, Response } from 'express';

export type ReqParamsType = { bookId: string; authorId: string };
export type ReqBodyType = { title: string };

function getBookHandler(
  req: Request<ReqParamsType, {}, ReqBodyType>,
  res: Response
) {
  const { params } = req;

  console.log(params);

  return res.send(res.locals.name);
}

export { getBookHandler };
