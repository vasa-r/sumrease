import { formatDistanceToNow } from "date-fns";

export const formatFileNameAsTitle = (fileName: string) => {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");

  const withSpace = withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");

  return withSpace
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
};

export const formatDate = (date: string) => {
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

  return formattedDate;
};

export const formatFileName = (fileUrl: string) => {
  const fileName = fileUrl.split("/").pop() || "";

  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
};
