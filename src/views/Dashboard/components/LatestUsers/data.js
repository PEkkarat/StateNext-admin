import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: 'Nicci Troiani',
    imageUrl: '/images/avatars/avatar_1.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'George Fields',
    imageUrl: '/images/avatars/avatar_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Jones Dermot',
    imageUrl: '/images/avatars/avatar_3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Jane Doe',
    imageUrl: '/images/avatars/avatar_4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'Eric num',
    imageUrl: '/images/avatars/avatar_5.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];
