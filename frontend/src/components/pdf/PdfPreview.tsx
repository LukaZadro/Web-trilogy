import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

const PdfPreview = ({ fileUrl, pageNumber }) => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  return (
    <div className="h-[900px] w-full md:px-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <ZoomOutButton />
        <ZoomPopover />
        <ZoomInButton />
      </div>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={fileUrl}
          initialPage={pageNumber}
          defaultScale={SpecialZoomLevel.PageWidth}
          plugins={[zoomPluginInstance]}
        />
      </Worker>
    </div>
  );
};
export default PdfPreview;
