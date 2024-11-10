import { Gift } from '../types/database';

export const gifts: Gift[] = [
  {
    id: "ba8a1955-5f71-4cde-9886-62fc829784a1",
    name: "cocoa",
    desc: "โกโก้ร้อนช่วยให้ร่างกายอุ่น แต่รอยยิ้มคุณช่วยให้อุ่นใจ",
    imgURL: "/img/Sticker/Cocoa.png",
    bgColorCode: "white",
    borderColor: "#B44137",
    order: 1
  },
  {
    id: "04fc6ec8-abc6-4328-9dce-66aaf8516c64",
    name: "momiji",
    desc: "ใบไม้อาจมีเปลี่ยนสี แต่คำว่า 'รัก' ที่สกม.มีไม่เคยเปลี่ยนไป",
    imgURL: "/img/Sticker/Manju.png",
    bgColorCode: "white",
    borderColor: "#AA613F",
    order: 2
  },
  {
    id: "32671e3c-59fb-4972-8926-18f5751efe16",
    name: "star",
    desc: "คืนที่ดาวเต็มฟ้า ฉันจินตนาการเป็นหน้าเธอ",
    imgURL: "/img/Sticker/Star.png",
    bgColorCode: "white",
    borderColor: "#CFBB41",
    order: 3
  },
  {
    id: "46fd5699-ccb1-4882-b5ad-469b8491747a",
    name: "pork",
    desc: "หมูปิ้งร้อนๆก็ยังไม่ฮ็อตเท่าพี่",
    imgURL: "/img/Sticker/Grilled pork.png",
    bgColorCode: "white",
    borderColor: "#2A5421",
    order: 4
  },
  {
    id: "6916f01c-2287-4637-aa57-65b7886dc368",
    name: "cpu",
    desc: "คุณมีงบเท่าไหร่ แลกหัวใจคุณแทนได้ไหมคะ",
    imgURL: "/img/Sticker/PC RGB.png",
    bgColorCode: "white",
    borderColor: "#5A7397",
    order: 5
  }
];

export const giftMap: { [key: string]: Gift } = gifts.reduce((acc, gift) => {
  acc[gift.id] = gift;
  return acc;
}, {} as { [key: string]: Gift });