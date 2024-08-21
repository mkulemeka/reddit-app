export const formatCommentDate = (date) => {
  if (!date) return "No date";

  const currentDate = new Date();
  const commentDate = new Date(date * 1000);
  const timeDifference = currentDate - commentDate;
  const daysdifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return dateCase(daysdifference, commentDate);
};

const dateCase = (difference, commentDate) => {
  if (difference < 1) return "Today";
  else if (difference === 1) return "1 day ago";
  else if (difference < 7) return `${difference} days ago`;
  else return commentDate.toLocaleDateString();
};

export const decodeUrl = (url, fallbackUrl) => {
  if (!url)
    return fallbackUrl === "self" || fallbackUrl === "default" ? null : fallbackUrl;
  else return url?.replace(/&amp;/g, "&");
};

const sortPosts = (posts, sortby) => {
  return posts.slice().sort((a, b) => {
    if (sortby === "upvotes") return b.ups - a.ups;
    else if (sortby === "comments") return b.num_comments - a.num_comments;
    else return new Date(b.created_utc) - new Date(a.created_utc);
  });
};


