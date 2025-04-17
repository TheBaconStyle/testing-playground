'use client';
import { Box, Button, CircularProgress } from '@mui/material';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { useState } from 'react';

export default function DashboardPage() {
  const [totalBytesState, setTotalBytesState] = useState(0);

  const [bytesUploaded, setBytesUploaded] = useState(0);

  const [progress, setProgress] = useState(0);

  async function uploadBlob() {
    const file = new File([new Uint8Array(20 * 1024 * 1024)], 'qwe.png');

    const totalBytes = file.size;

    let uploaded = 0;

    setTotalBytesState(totalBytes);
    setProgress(uploaded / totalBytes);

    const progressTrackingStream = new TransformStream({
      transform(chunk, controller) {
        controller.enqueue(chunk);
        uploaded += chunk.byteLength;
        setBytesUploaded(uploaded);
        setProgress(uploaded / totalBytes);
      },
      flush() {
        setProgress(uploaded / totalBytes);
      },
    });

    await fetch(
      'https://s3.baconcs.duckdns.org/images/qwe.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Um68RMs2xZay1HLnu2QH%2F20250414%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250414T133920Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Signature=1064b0ded65b28085745f60c37d817498a39d7ffbb5c3dea7224fe4f0dc69b2b',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': String(file.size),
        },
        body: file.stream().pipeThrough(progressTrackingStream),
        duplex: 'half',
      } as RequestInit,
    ).catch((e) => console.log(e));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexGrow: 1 }}>
      <div>всего: {String(totalBytesState)}</div>
      <div>загружено: {String(bytesUploaded)}</div>
      <div>прогресс: {String(progress)}</div>
      <CircularProgress
        variant="determinate"
        value={Math.round(progress * 100)}
      />
      <Button onClick={() => uploadBlob()}>Загрузить</Button>
    </Box>
  );
}
