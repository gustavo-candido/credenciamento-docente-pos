import Container from "@mui/material/Container";
import React, { ReactElement, ReactNode } from "react";

import Dropzone from "react-dropzone";
import api from "../services/api";
import { DropContainer, UploadMessage } from "./styles";

const onUpload = (file: File[]) => {
  console.log("uplodad");
};

const Upload = (): ReactElement => {
  function renderDragMessage(
    isDragActive: boolean,
    isDragRejest: boolean
  ): ReactNode {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragRejest) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <Container maxWidth="xl">
      <Dropzone
        // accept=".csv, application/vnd.ms-excel, text/csv"
        onDropAccepted={(files) => onUpload(files)}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} data-testid="upload" />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </Container>
  );
};

export default Upload;
