import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";

import samplePdf from "../libs/test.pdf";

const PdfContainerComponent = ({file}) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
   
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    }

    const onLoadError = (err) => {
        console.info(err)
    }

    useEffect(() => {

    },[])

    return(<div>
        <Document
          file={samplePdf}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onLoadError}
        >
          <Page pageNumber={1} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>)
}

export default PdfContainerComponent