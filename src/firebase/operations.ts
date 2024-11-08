import * as admin from 'firebase-admin';
import { getDatabase, ref, push, get, serverTimestamp, DataSnapshot } from 'firebase-admin/database';

const db = getDatabase();

export interface Gift {
    id: string;
    name: string;
    desc: string | undefined;
    imgURL: string;
    bgColorCode: string;
    borderColor: string;
    order: number;
}

interface RawPost {
    name: string;
    comment: string;
    giftId: string;
    createdAt: number | null;
}

export interface Post {
    id: string;
    name: string;
    comment: string;
    giftId: string;
    createdAt: number | null;
    gift: Gift;
}

function isValidRawPost(data: any): data is RawPost {
    return (
        typeof data === 'object' &&
        data !== null &&
        typeof data.name === 'string' &&
        typeof data.comment === 'string' &&
        typeof data.giftId === 'string' &&
        (typeof data.createdAt === 'number' || data.createdAt === null)
    );
}

const giftMap: Record<string, Gift> = {
    "1": {
        id: "ba8a1955-5f71-4cde-9886-62fc829784a1",
        name: "cocoa",
        desc: undefined,
        imgURL: "/img/Sticker/Cocoa.png",
        bgColorCode: "white",
        borderColor: "#B44137",
        order: 1,
    },
    "2": {
        id: "04fc6ec8-abc6-4328-9dce-66aaf8516c64",
        name: "momiji",
        desc: undefined,
        imgURL: "/img/Sticker/Manju.png",
        bgColorCode: "white",
        borderColor: "#AA613F",
        order: 2,
    },
    "3": {
        id: "32671e3c-59fb-4972-8926-18f5751efe16",
        name: "star",
        desc: undefined,
        imgURL: "/img/Sticker/Star.png",
        bgColorCode: "white",
        borderColor: "#CFBB41",
        order: 3,
    },
    "4": {
        id: "46fd5699-ccb1-4882-b5ad-469b8491747a",
        name: "pork",
        desc: undefined,
        imgURL: "/img/Sticker/Grilled pork.png",
        bgColorCode: "white",
        borderColor: "#2A5421",
        order: 4,
    },
    "5": {
        id: "6916f01c-2287-4637-aa57-65b7886dc368",
        name: "cpu",
        desc: undefined,
        imgURL: "/img/Sticker/PC RGB.png",
        bgColorCode: "white",
        borderColor: "#5A7397",
        order: 5,
    },
};

export const writePost = async (
    name: string,
    comment: string,
    giftId: string
): Promise<string> => {
    if (!giftMap[giftId]) {
        throw new Error(`Invalid giftId: ${giftId}`);
    }

    const postsRef = ref(db, 'posts');  
    const postData: Omit<RawPost, 'createdAt'> & { createdAt: any } = {
        name: name.trim(),
        comment: comment.trim(),
        giftId,
        createdAt: serverTimestamp(),
    };

    try {
        const newPostRef = await push(postsRef, postData);
        if (!newPostRef.key) {
            throw new Error('Failed to generate post key');
        }
        return newPostRef.key;
    } catch (error) {
        console.error('Error writing post:', error);
        throw error;
    }
};

export const getPosts = async (): Promise<{ data: Post[]; total: number }> => {
    const postsRef = ref(db, 'posts');  

    try {
        const snapshot = await get(postsRef);
        const posts: Post[] = [];

        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot: DataSnapshot) => {
                const rawPost = childSnapshot.val();
                if (!isValidRawPost(rawPost)) {
                    console.warn(`Invalid post data for key ${childSnapshot.key}:`, rawPost);
                    return;
                }

                const gift = giftMap[rawPost.giftId];
                if (!gift) {
                    console.warn(`Invalid giftId ${rawPost.giftId} for post ${childSnapshot.key}`);
                    return;
                }

                const post: Post = {
                    id: childSnapshot.key as string,
                    name: rawPost.name,
                    comment: rawPost.comment,
                    giftId: gift.id,
                    createdAt: rawPost.createdAt,
                    gift,
                };
                posts.push(post);
            });
        }

        posts.sort((a, b) => {
            if (a.createdAt === null && b.createdAt === null) return 0;
            if (a.createdAt === null) return 1;
            if (b.createdAt === null) return -1;
            return b.createdAt - a.createdAt;
        });

        return {
            data: posts,
            total: posts.length,
        };
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};
