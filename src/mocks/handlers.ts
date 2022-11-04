import { rest } from 'msw';
import { listDatacenter, listFolder } from './vmdata';

export const handlers = [
  rest.get('/api/vcenter/datacenter', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listDatacenter));
  }),
  rest.get('/api/vcenter/folder', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listFolder));
  }),
];
