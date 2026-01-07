import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PageCard from "./PageCard";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  fileUrl: string;
  onChange: (pages: number[]) => void;
}

export default function PdfPreview({ fileUrl, onChange }: Props) {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const togglePage = (page: number) => {
    setSelectedPages((prev) => {
      const updated = prev.includes(page)
        ? prev.filter((p) => p !== page)
        : [...prev, page];

      onChange(updated);
      return updated;
    });
  };

  return (
    <div className="w-full">
        <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="hidden" // Load internally to get page count, but likely need to render pages loops independently? 
            // Actually Document should wrap the list if we want context, but for simple rendering:
        >
           {/* access to usePageContext/etc is usually needed? No, we can just loop if we have numPages */}
        </Document>

        {/* Since Document is async, we often render it once to get stats, 
            or better, wrap the grid in the Document context. */}
        
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from(new Array(numPages), (_, index) => (
          <PageCard
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            selected={selectedPages.includes(index + 1)}
            onToggle={() => togglePage(index + 1)}
          >
            <Page 
                pageNumber={index + 1} 
                width={200} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
            />
          </PageCard>
        ))}
      </Document>
    </div>
  );
}
