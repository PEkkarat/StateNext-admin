import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    title: 'ระบบใช้งานไม่ได้',
    type:'รายงานบัก',
    avatarUrl: '/images/errors/error1.jpg',
    name : 'Mitty Khanjana'
  },
  {
    id: uuid(),
    title: 'การจองใช้งานยาก',
    avatarUrl: '/images/errors/file.png',
    type:'ให้ข้อเสนอแนะเกี่ยวกับผลิตภัณฑ์',
    name : 'Mitty Khanjana'
  },
];
