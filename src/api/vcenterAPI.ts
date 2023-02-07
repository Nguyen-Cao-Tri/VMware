/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-redeclare */
import { ICpu, IDatacenter, IFolder, IGetPower, IGuest, IMemory, INetwork, ITools, IVm } from './TypeAPI';

const baseURL = process.env.REACT_APP_API_URL;

const fetchAPI = <T>(url: string, method?: string, body?: Record<string, unknown> | FormData): Promise<T> => {
  const sessionId = localStorage.getItem('sessionId');
  const headers = { 'vmware-api-session-id': sessionId ?? '', 'content-type': 'application/json' };
  return fetch(`${baseURL}${url}`, {
    method,
    headers,
    credentials: 'omit',
    body: JSON.stringify(body),
  }).then(res => {
    if (res.status === 401) {
      localStorage.removeItem('sessionId');
      window.location.assign('/login');
    }
    return res.json();
  });
};

export const vcenterAPI = {
  getDatacenters: (): Promise<IDatacenter[]> => {
    return fetchAPI<IDatacenter[]>(`/api/vcenter/datacenter`);
  },
  getFoldersByIdParent: (datacenterID?: string, parentFolder?: string): Promise<IFolder[]> => {
    if (parentFolder?.length === 0) {
      return fetchAPI<IFolder[]>(`/api/vcenter/folder?names=vm&datacenters=${datacenterID}`);
    }
    return fetchAPI<IFolder[]>(`/api/vcenter/folder?datacenters=${datacenterID}&parent_folders=${parentFolder}`);
  },
  getFolders: (idFolder: string): Promise<IFolder[]> => {
    return fetchAPI<IFolder[]>(`/api/vcenter/folder?folders=${idFolder}`);
  },
  getVmsByIdParent: (folderID?: string, datacenterID?: string): Promise<IVm[]> => {
    return fetchAPI<IVm[]>(`/api/vcenter/vm?folders=${folderID}&datacenters=${datacenterID}`);
  },
  getVms: (idVm: string): Promise<IVm[]> => {
    return fetchAPI<IVm[]>(`/api/vcenter/vm?vms=${idVm}`);
  },
  postPower: (idVm?: string, action?: string): Promise<any> => {
    console.log('action', action);
    return fetchAPI(`/api/vcenter/vm/${idVm}/power?action=${action}`, 'POST');
  },
  getPower: (idVm: string): Promise<IGetPower> => {
    return fetchAPI<IGetPower>(`/api/vcenter/vm/${idVm}/power`);
  },
  postTransferFile: (idVm: string, body: Record<string, unknown> | FormData): Promise<string> => {
    return fetchAPI<string>(`/api/vcenter/vm/${idVm}/guest/filesystem?action=create`, 'POST', body);
  },
  postCreateProcessFile: (idVm: string, body: Record<string, unknown> | FormData): Promise<string> => {
    return fetchAPI<string>(`/api/vcenter/vm/${idVm}/guest/processes?action=create`, 'POST', body);
  },
  getGuestOS: (idVm?: string): Promise<IGuest> => {
    return fetchAPI(`/api/vcenter/vm/${idVm}/guest/identity`);
  },
  getTools: (idVm?: string): Promise<ITools> => {
    return fetchAPI(`/api/vcenter/vm/${idVm}/tools`);
  },
  getNetWork: (idVm?: string): Promise<INetwork[]> => {
    return fetchAPI(`/api/vcenter/vm/${idVm}/guest/networking/interfaces`);
  },
  getMemory: (idVm?: string): Promise<IMemory> => {
    return fetchAPI(`/api/vcenter/vm/${idVm}/hardware/memory`);
  },
  getCpu: (idVm?: string): Promise<ICpu> => {
    return fetchAPI(`/api/vcenter/vm/${idVm}/hardware/cpu`);
  },
};
