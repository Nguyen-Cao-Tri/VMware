import { rest } from 'msw';
import { listDatacenter, listFolder, listVM } from './vmdata';

const delay = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    await delay(3000);

    const validAccounts = [
      {
        username: 'admin',
        password: 'admin',
      },
      {
        username: 'user',
        password: 'user',
      },
    ];
    const { username, password } = await req.json();
    const account = validAccounts.find(
      (account) =>
        account.username === username && account.password === password,
    );

    if (account === null) {
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
];
