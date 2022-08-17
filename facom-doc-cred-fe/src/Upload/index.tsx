import Container from "@mui/material/Container";
import React, { ReactElement, ReactNode } from "react";

import Dropzone from "react-dropzone";
import { Paper } from "@mui/material";
import api from "../services/api";
import { useUser } from "../user";
import { DropContainer, UploadMessage } from "./styles";

const onUpload = (professorId?: string, file?: File[]) => {
  api.post(
    `import/${professorId}`,
    { record: file?.[0] },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const Upload = (): ReactElement => {
  const {
    user: { professorId },
  } = useUser();

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
    <Paper sx={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Container maxWidth="lg">
        <Dropzone
          onDropAccepted={(files) => onUpload(professorId, files)}
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
    </Paper>
  );
};

export default Upload;
