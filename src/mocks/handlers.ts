/* eslint-disable @typescript-eslint/no-unused-vars */
import { rest } from 'msw';
import { listDatacenter, listFolder, listVM } from './vmdata';

const delay = async (time: number) => {
  await new Promise(resolve => setTimeout(resolve, time));
};

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    await delay(3000);

    const validAccounts = {
      username: 'admin',
      password: 'admin',
    };
    const { username, password } = await req.json();
    if (username !== validAccounts.username && password !== validAccounts.password) {
      return await res(ctx.status(401), ctx.json({ message: 'Invalid username or password' }));
    }
    return await res(ctx.status(200), ctx.json({ apiKey: 'fake_api_key' }));
  }),
  rest.get('/api/vcenter/datacenter', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listDatacenter));
  }),
  // rest.get('/api/vcenter/folder', (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(listFolder));
  // }),

  // rest.post('/api/vcenter/vm/:vm/guest/filesystem', async (req, res, ctx) => {
  //   console.log('param', req.params);
  //   const action = req.url.searchParams.get('action');
  //   if (action !== 'create') {
  //     return await res(ctx.status(401), ctx.json({ message: 'Invalid action' }));
  //   }
  //   return await res(
  //     ctx.status(200),
  //     ctx.json({
  //       vm,
  //       action,
  //       link: '/guestFile?id=3&token=52b2f156-a58f-d73c-0ed1-b185b8842b353',
  //     }),
  //   );
  // }),
  // rest.get('/guestFile', async (req, res, ctx) => {
  //   const fileBuffer = await fetch(
  //     'https://www.dundeecity.gov.uk/sites/default/files/publications/civic_renewal_forms.zip',
  //     { mode: 'no-cors' },
  //   ).then(async res => await res.arrayBuffer());

  //   return await res(
  //     ctx.set('Content-Length', fileBuffer.byteLength.toString()),
  //     ctx.set('Content-Type', 'application/zip'),
  //     ctx.body(fileBuffer),
  //   );
  // }),
  // rest.post('/api/vcenter/vm?action=clone', async (req, res, ctx) => {
  //   const body = await req.json();
  //   return await res(ctx.status(200), ctx.json({ name: body.name, id: body.source }));
  // }),
  // rest.put('/guestFile', (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ message: 'Successfully!' }));
  // }),
  rest.get('/api/vcenter/folder', async (req, res, ctx) => {
    const parentFolder = req.url.searchParams.get('parent_folders');
    if (req.url.search === '?names=vm&datacenters=datacenter-3') {
      return await res(
        ctx.status(200),
        ctx.json([
          {
            folder: 'group-v4',
            name: 'vm',
            type: 'VIRTUAL_MACHINE',
          },
        ]),
      );
    }
    if (req.url.search.length > 0) {
      if (parentFolder === 'group-v4') {
        return await res(
          ctx.status(200),
          ctx.json([
            {
              folder: 'group-v22',
              name: 'Demo Virtual Machine',
              type: 'VIRTUAL_MACHINE',
            },
          ]),
        );
      }
      if (parentFolder === 'group-v22') {
        return await res(
          ctx.status(200),
          ctx.json([
            {
              folder: 'group-v23',
              name: 'Windows VM',
              type: 'VIRTUAL_MACHINE',
              parentFolder: 'group-v22',
            },
            {
              folder: 'group-v24',
              name: 'Linux VM',
              type: 'VIRTUAL_MACHINE',
              parentFolder: 'group-v22',
            },
          ]),
        );
      }
      return await res(ctx.status(200), ctx.json([]));
    }
    return await res(ctx.status(200), ctx.json(listFolder));
  }),
  rest.get('/api/vcenter/vm', async (req, res, ctx) => {
    const parentFolder = req.url.searchParams.get('folders');
    const paramSearch = req.url.search;
    if (paramSearch.length > 0) {
      if (parentFolder === 'group-v23') {
        return await res(
          ctx.status(200),
          ctx.json([
            {
              memory_size_MiB: 8192,
              vm: 'vm-17',
              name: 'Windows 11',
              power_state: 'POWERED_OFF',
              cpu_count: 4,
            },
          ]),
        );
      }
      if (parentFolder === 'group-v24') {
        return await res(
          ctx.status(200),
          ctx.json([
            {
              memory_size_MiB: 4096,
              vm: 'vm-35',
              name: 'Ubuntu',
              power_state: 'POWERED_ON',
              cpu_count: 2,
            },
          ]),
        );
      }
      return await res(ctx.status(200), ctx.json([]));
    }
    return await res(ctx.status(200), ctx.json(listVM));
  }),
];
