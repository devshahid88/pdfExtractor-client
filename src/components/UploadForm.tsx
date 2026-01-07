import type { ChangeEvent } from "react";

interface Props {
  onUpload: (file: File) => void;
}

export default function UploadForm({ onUpload }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    onUpload(file);
  };

  return (
    <div className="border p-4 rounded-lg">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
      />
    </div>
  );
}
