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

export const sortPosts = (posts, sortBy) => {
  switch (sortBy) {
    case "upvotes":
      return posts.sort((a, b) => b.ups - a.ups);
    case "date":
      return posts.sort((a, b) => b.created_utc - a.created_utc);
    case "comments":
      return posts.sort((a, b) => b.num_comments - a.num_comments);
    default:
      return posts;
  }
};

export const filterPosts = (posts, filterBy = "all") => {
  switch (filterBy) {
    case "new":
      return posts.filter((post) => post.created_utc > Date.now() / 1000 - 86400);
    case "hot":
      return posts.filter((post) => post.ups > 5000);
    case "top":
      return posts.filter((post) => post.num_comments > 500);
    default:
      return posts;
  }
};

export const searchPosts = (posts, searchTerm) => {
  if (!searchTerm) return posts;

  return posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
