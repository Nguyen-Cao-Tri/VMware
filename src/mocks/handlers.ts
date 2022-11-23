import { rest } from 'msw';
import { listDatacenter, listFolder, listVM } from './vmdata';

const delay = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    await delay(3000);

    const validAccounts = {
      username: 'admin',
      password: 'admin',
    };
    const { username, password } = await req.json();
    if (
      username !== validAccounts.username &&
      password !== validAccounts.password
    ) {
      return await res(
        ctx.status(401),
        ctx.json({ message: 'Invalid username or password' }),
      );
    }
    return await res(ctx.status(200), ctx.json({ apiKey: 'fake_api_key' }));
  }),
  rest.get('/api/vcenter/datacenter', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listDatacenter));
  }),
  rest.get('/api/vcenter/folder', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listFolder));
  }),
  rest.get('/api/vcenter/vm', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listVM));
  }),
  rest.post('/api/vcenter/vm/:vm/guest/filesystem', async (req, res, ctx) => {
    const { vm } = req.params;
    console.log('param', req.params);
    const action = req.url.searchParams.get('action');
    if (action !== 'create') {
      return await res(
        ctx.status(401),
        ctx.json({ message: 'Invalid action' }),
      );
    }
    return await res(
      ctx.status(200),
      ctx.json({
        vm,
        action,
        link: '/guestFile?id=3&token=52b2f156-a58f-d73c-0ed1-b185b8842b353',
      }),
    );
  }),
  rest.get('/guestFile', async (req, res, ctx) => {
    const fileBuffer = await fetch(
      'https://www.dundeecity.gov.uk/sites/default/files/publications/civic_renewal_forms.zip',
      { mode: 'no-cors' },
    ).then(async (res) => await res.arrayBuffer());

    return await res(
      ctx.set('Content-Length', fileBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'application/zip'),
      ctx.body(fileBuffer),
    );
  }),
  rest.post('/api/vcenter/vm?action=clone', async (req, res, ctx) => {
    const body = await req.json();
    return await res(
      ctx.status(200),
      ctx.json({ name: body.name, id: body.source }),
    );
  }),
  rest.put('/guestFile', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Successfully!' }));
  }),
];
