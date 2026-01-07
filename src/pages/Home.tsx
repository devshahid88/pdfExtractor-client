import { useState } from "react";
import UploadForm from "../components/UploadForm";
import PdfPreview from "../components/PdfPreview";
import { api } from "../services/api";

export default function Home() {
  const [fileId, setFileId] = useState<string | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const uploadPdf = async (file: File) => {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await api.post("/pdf/upload", formData);
      setFileId(res.data.fileId);
      // Reset state on new upload
      setPages([]);
      setDownloadUrl(null);
    } catch (error) {
      alert("Upload failed");
    }
  };

  const extractPdf = async () => {
    if (!fileId || pages.length === 0) {
      alert("Select pages");
      return;
    }

    try {
      const res = await api.post("/pdf/extract", {
        fileId,
        pages,
      });

      setDownloadUrl(
        `http://localhost:5000${res.data.downloadUrl}`
      );
    } catch (error) {
      alert("Extraction failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">PDF Page Extractor</h1>
        <p className="text-gray-500">Upload a PDF, select pages, and download a new file.</p>
      </header>

      <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
         <UploadForm onUpload={uploadPdf} />
      </div>

      {fileId && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Select Pages</h2>
             <button
              onClick={extractPdf}
              disabled={pages.length === 0}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                pages.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              }`}
            >
              Extract {pages.length} Page{pages.length !== 1 && 's'}
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
            <PdfPreview 
                fileUrl={`http://localhost:5000/uploads/${fileId}`} 
                onChange={setPages} 
            />
          </div>
        </div>
      )}

      {downloadUrl && (
        <div className="fixed bottom-8 right-8 bg-white p-4 rounded-lg shadow-xl border border-blue-100 flex items-center gap-4 animate-slide-up">
          <div className="bg-green-100 text-green-700 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">PDF Ready!</p>
            <a
              href={downloadUrl}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
              target="_blank"
              rel="noreferrer"
            >
              Download extracted file
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
