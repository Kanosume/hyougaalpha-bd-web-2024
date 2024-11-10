import { supabase } from './config';
import { Post, RawPost } from '../types/supabase';
import { giftMap } from '../data/gifts';

function isValidRawPost(data: any): data is RawPost {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    typeof data.comment === 'string' &&
    typeof data.gift_id === 'string' &&
    (typeof data.created_at === 'number' || data.created_at === null)
  );
}

export const writePost = async (
  name: string,
  comment: string,
  giftId: string
): Promise<string> => {
  if (!giftMap[giftId]) {
    throw new Error(`Invalid giftId: ${giftId}`);
  }

  if (typeof window === 'undefined') {
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

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('No data returned from insert');
    }

    return data.id;
  } catch (error) {
    console.error('Error writing post:', error);
    throw error;
  }
};

export const getPosts = async (): Promise<{ data: Post[]; total: number }> => {
  if (typeof window === 'undefined') {
    return { data: [], total: 0 };
  }

  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!posts) return { data: [], total: 0 };

    const formattedPosts: Post[] = posts
      .map((post: any) => {
        if (!isValidRawPost(post)) {
          console.warn(`Invalid post data structure for post ID ${post.id}`);
          return null;
        }

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
      })
      .filter((post: Post | null): post is Post => post !== null);

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