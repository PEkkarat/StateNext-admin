import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    ref: '1',
    amount: 30.5,
    customer: {
      name: 'ขายคฤหาสน์หรู บ้านหรู บ้านเดี่ยว ย่าน รังสิต ธัญบุรี ลำลูกกา ปทุมธานี พร้อมเฟอร์นิเจอร์'
    },
    createdAt: 1555016400000,
    status: 'อนุมัติ'
  },
  {
    id: uuid(),
    ref: '2',
    amount: 25.1,
    customer: {
      name: 'ขายทาวน์เฮ้าท์ 2 ชั้น 25 ตร. ว. ใกล้สนามบินดอนเมือง 1. 7 ล้าน'
    },
    createdAt: 1555016400000,
    status: 'อนุมัติ'
  },
  {
    id: uuid(),
    ref: '3',
    amount: 10.99,
    customer: {
      name: 'ขาย บ้านเดี่ยวหมู่บ้าน การ์เด้นโฮมวิลเลจ พื้นที่ 164 ตร. ว. วิวสวย หลังมุมหลังบ้านติดน้ำ'
    },
    createdAt: 1554930000000,
    status: 'อนุมัติ'
  },
  // {
  //   id: uuid(),
  //   ref: 'CDD1046',
  //   amount: 96.43,
  //   customer: {
  //     name: 'Anje Keizer'
  //   },
  //   createdAt: 1554757200000,
  //   status: 'pending'
  // },
  // {
  //   id: uuid(),
  //   ref: 'CDD1045',
  //   amount: 32.54,
  //   customer: {
  //     name: 'Clarke Gillebert'
  //   },
  //   createdAt: 1554670800000,
  //   status: 'delivered'
  // },
  // {
  //   id: uuid(),
  //   ref: 'CDD1044',
  //   amount: 16.76,
  //   customer: {
  //     name: 'Adam Denisov'
  //   },
  //   createdAt: 1554670800000,
  //   status: 'delivered'
  // }
];
