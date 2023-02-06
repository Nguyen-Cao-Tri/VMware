/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-redeclare */
import Datacenter from 'pages/Datacenter/Datacenter';
export interface Datacenter {
  name: string;
  datacenter: string;
}
export interface Folder {
  folder: string;
  name: string;
  type: string;
}
export interface Vm {
  memory_size_MiB: number;
  vm: string;
  name: string;
  power_state: string;
  cpu_count: number;
}
interface Power {
  setPowerState: string;
  state: string;
}

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
  getDatacenters: (): Promise<Datacenter[]> => {
    return fetchAPI<Datacenter[]>(`/api/vcenter/datacenter`);
  },
  getFoldersByIdParent: (datacenterID: string, parentFolder: string): Promise<Folder[]> => {
    if (parentFolder?.length === 0) {
      return fetchAPI<Folder[]>(`/api/vcenter/folder?names=vm&datacenters=${datacenterID}`);
    }
    return fetchAPI<Folder[]>(`/api/vcenter/folder?datacenters=${datacenterID}&parent_folders=${parentFolder}`);
  },
  getFolders: (idFolder: string): Promise<Folder[]> => {
    return fetchAPI<Folder[]>(`/api/vcenter/folder?folders=${idFolder}`);
  },
  getVmsByIdParent: (folderID: string, datacenterID: string): Promise<Vm[]> => {
    return fetchAPI<Vm[]>(`/api/vcenter/vm?folders=${folderID}&datacenters=${datacenterID}`);
  },
  getVms: (idVm: string): Promise<Vm[]> => {
    return fetchAPI<Vm[]>(`/api/vcenter/vm?vms=${idVm}`);
  },
  postPower: (idVm?: string, action?: string): Promise<any> => {
    console.log('action', action);
    return fetchAPI(`/api/vcenter/vm/${idVm}/power?action=${action}`, 'POST');
  },
  getPower: (idVm: string): Promise<Power> => {
    return fetchAPI<Power>(`/api/vcenter/vm/${idVm}/power`);
  },
  postTransferFile: (idVm: string, body: Record<string, unknown> | FormData): Promise<string> => {
    return fetchAPI<string>(`/api/vcenter/vm/${idVm}/guest/filesystem?action=create`, 'POST', body);
  },
  postCreateProcessFile: (idVm: string, body: Record<string, unknown> | FormData): Promise<string> => {
    return fetchAPI<string>(`/api/vcenter/vm/${idVm}/guest/processes?action=create`, 'POST', body);
  },
};
