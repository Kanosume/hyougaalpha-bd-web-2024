export interface RawPost {
    id: string;
    name: string;
    comment: string;
    gift_id: string;
    created_at: number | null;
  }
  
  export interface Gift {
    id: string;
    name: string;
    desc: string;
    imgURL: string;
    bgColorCode: string;
    borderColor: string;
    order: number;
  }
  
  export interface Post {
    id: string;
    name: string;
    comment: string;
    giftId: string;
    createdAt: number | null;
    gift: Gift;
  }