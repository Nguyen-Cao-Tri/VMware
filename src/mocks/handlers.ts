import { rest } from 'msw';
import { listDatacenter, listFolder, listVM } from './vmdata';

export const handlers = [
  rest.get('/api/vcenter/datacenter', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listDatacenter));
  }),
  rest.get('/api/vcenter/folder', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listFolder));
  }),
  rest.get('/api/vcenter/vm/data-sets', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listVM));
  }),
  rest.post('/auth/login', async (req, res, ctx) => {
    const { username, password } = await req.json();
    console.log('username', username);
    console.log('password', password);
    return await res(ctx.status(200));
  }),
];
