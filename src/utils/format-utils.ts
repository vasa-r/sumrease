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
