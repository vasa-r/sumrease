import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const fetchNExtractPdfTxt = async (pdfUrl: string) => {
  const response = await fetch(pdfUrl);

  const blob = await response.blob();

  const arrayBuf = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuf]));

  const docs = await loader.load();

  const combinedPages = docs.map((page) => page.pageContent).join("\n");

  return combinedPages;
};
