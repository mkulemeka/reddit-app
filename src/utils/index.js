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
