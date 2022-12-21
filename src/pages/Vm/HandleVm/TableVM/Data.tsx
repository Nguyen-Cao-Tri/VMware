interface DataType {
  key: string;
  title: string;
  content: string;
}
export const data: DataType[] = [
  {
    key: '1',
    title: 'Utilization',
    content: '2 CPU(s), 0 MHz used',
  },
  {
    key: '2',
    title: 'Shares',
    content: '4000 (Normal)',
  },
  {
    key: '3',
    title: 'Reservation',
    content: '0 MHz',
  },
  {
    key: '4',
    title: 'Limit',
    content: 'Unlimited',
  },
  {
    key: '5',
    title: 'Utilization',
    content: '8 GB, 0 GB memory active',
  },
  {
    key: '6',
    title: 'VM overhead consumed',
    content: '0 MB',
  },
  {
    key: '7',
    title: 'Controllers',
    content: 'USB xHCI controller (USB xHCI controller)',
  },
  {
    key: '8',
    title: 'SCSI Adapters',
    content: 'SCSI controller 0 (LSI Logic SAS)',
  },
  {
    key: '9',
    title: 'Input Devices',
    content: 'Keyboard, Pointing device',
  },
];
