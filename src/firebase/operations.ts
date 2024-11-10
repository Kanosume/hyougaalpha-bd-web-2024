import { supabase } from './config';

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

    // Check if we're in build/SSG mode
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
        return 'build-time-id';
    }

    const postData = {
        name: name.trim(),
        comment: comment.trim(),
        gift_id: giftId,
        created_at: Math.floor(Date.now()),
    };

    try {
        const { data, error } = await supabase
            .from('posts')
            .insert(postData)
            .select('id')
            .single();

        if (error) throw error;
        if (!data) throw new Error('No data returned from insert');
        
        return data.id;
    } catch (error) {
        console.error('Error writing post:', error);
        throw error;
    }
};

export const getPosts = async (): Promise<{ data: Post[]; total: number }> => {
    // During build time, return empty array
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
        return { data: [], total: 0 };
    }

    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!posts) return { data: [], total: 0 };

        const formattedPosts: Post[] = posts.map((post: any) => {
            const gift = giftMap[post.gift_id];
            if (!gift) {
                console.warn(`Invalid giftId ${post.gift_id} for post ${post.id}`);
                return null;
            }

            return {
                id: post.id,
                name: post.name,
                comment: post.comment,
                giftId: gift.id,
                createdAt: post.created_at,
                gift,
            };
        }).filter((post: Post | null): post is Post => post !== null);

        return {
            data: formattedPosts,
            total: formattedPosts.length,
        };
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};

export default {
    writePost,
    getPosts,
};
