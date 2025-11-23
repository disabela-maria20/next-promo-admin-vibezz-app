import { useState } from 'react';

export interface Base64FileHook {
  file: File | null;
  convert: (base64: string, fileName?: string) => void;
  reset: () => void;
}

export function useBase64FileUpload(): Base64FileHook {
  const [file, setFile] = useState<File | null>(null);

  const convert = (base64: string, fileName = 'arquivo.pdf') => {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (!mimeMatch) {
      throw new Error('Base64 inválido');
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    setFile(new File([u8arr], fileName, { type: mime }));
  };

  const reset = () => setFile(null);

  return { file, convert, reset };
}
