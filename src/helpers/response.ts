import { HttpStatus } from '@nestjs/common';

export const buildResponse = (
  isSuccess: boolean,
  message: string,
  dataOrError?: any,
  statusCode?: number,
) => {
  // Membuat respons dasar
  const response: {
    statusCode: number;
    message: string;
    data?: any;
    error?: any;
  } = {
    statusCode: isSuccess ? HttpStatus.OK : statusCode,
    message: message,
  };

  // Hanya sertakan data atau error jika disediakan
  if (dataOrError !== null) {
    if (isSuccess) {
      response.data = dataOrError; // Hanya tambahkan data jika sukses
    } else {
      response.error = dataOrError;
    }
  }

  return response; // Kembalikan respons
};
