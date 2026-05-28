// Danh sách nhóm cố định của Phương
const FACEBOOK_GROUPS = [
  'comailo',
  'groupaivietnam',
  'openclawxvn',
  '861108920047086',
];

// Đăng lên tất cả nhóm (dùng User Access Token, không schedule được)
export async function postToGroups(content: string, hashtags: string, imageUrl: string | null) {
  const userToken = process.env.FACEBOOK_USER_TOKEN;
  if (!userToken) throw new Error("Thiếu FACEBOOK_USER_TOKEN — thêm vào Vercel Environment Variables");

  const message = `${content}\n\n${hashtags}`;
  const results: { groupId: string; success: boolean; id?: string; error?: string }[] = [];

  for (const groupId of FACEBOOK_GROUPS) {
    try {
      let resData: any;

      if (imageUrl) {
        // Đăng kèm ảnh
        const form = new FormData();
        form.append("access_token", userToken);
        form.append("caption", message);

        if (imageUrl.startsWith('data:')) {
          const [meta, base64data] = imageUrl.split(',');
          const mimeType = meta.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
          const buffer = Buffer.from(base64data, 'base64');
          const blob = new Blob([buffer], { type: mimeType });
          form.append("source", blob, "image.jpg");
        } else {
          form.append("url", imageUrl);
        }

        const photoRes = await fetch(`https://graph.facebook.com/v21.0/${groupId}/photos`, { method: "POST", body: form });
        resData = await photoRes.json();
      } else {
        // Đăng text only
        const feedRes = await fetch(`https://graph.facebook.com/v21.0/${groupId}/feed`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, access_token: userToken })
        });
        resData = await feedRes.json();
      }

      if (resData.id) {
        results.push({ groupId, success: true, id: resData.id });
      } else {
        results.push({ groupId, success: false, error: resData.error?.message || 'Unknown error' });
      }
    } catch (e: any) {
      results.push({ groupId, success: false, error: e.message });
    }
  }

  return results;
}

export async function postToFacebook(content: string, hashtags: string, imageUrl: string | null, scheduledTime?: number) {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_ACCESS_TOKEN;
  if (!pageId || !token) throw new Error("Missing FB credentials");

  const message = `${content}\n\n${hashtags}`;

  if (imageUrl) {
    // Stage 1: Upload photo as unpublished (Draft) to get media_fbid
    const form = new FormData();
    form.append("access_token", token);
    form.append("published", "false");

    // Base64 image → upload dạng binary; HTTP URL → upload dạng URL
    if (imageUrl.startsWith('data:')) {
      const [meta, base64data] = imageUrl.split(',');
      const mimeType = meta.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
      const buffer = Buffer.from(base64data, 'base64');
      const blob = new Blob([buffer], { type: mimeType });
      form.append("source", blob, "image.jpg");
    } else {
      form.append("url", imageUrl);
    }

    const photoRes = await fetch(`https://graph.facebook.com/v21.0/${pageId}/photos`, { method: "POST", body: form });
    const photoData = await photoRes.json();

    if (!photoData.id) {
      console.error("FB Photo Upload failed:", photoData);
      // Fallback: đăng text-only nếu upload ảnh thất bại
      return postTextOnly(message, token, pageId, scheduledTime);
    }

    // Stage 2: Publish/Schedule the actual Post to the Feed linking the uploaded photo
    const feedPayload: any = {
      message,
      access_token: token,
      attached_media: [{ media_fbid: photoData.id }]
    };

    if (scheduledTime) {
      feedPayload.published = false;
      feedPayload.scheduled_publish_time = scheduledTime;
    }

    const feedUrl = `https://graph.facebook.com/v21.0/${pageId}/feed`;
    const res = await fetch(feedUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedPayload)
    });
    return res.json();

  } else {
    return postTextOnly(message, token, pageId, scheduledTime);
  }
}

async function postTextOnly(message: string, token: string, pageId: string, scheduledTime?: number) {
  const feedUrl = `https://graph.facebook.com/v21.0/${pageId}/feed`;
  const payload: any = { message, access_token: token };

  if (scheduledTime) {
    payload.published = false;
    payload.scheduled_publish_time = scheduledTime;
  }

  const res = await fetch(feedUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
