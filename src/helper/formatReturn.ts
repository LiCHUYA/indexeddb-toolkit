export interface IReturn {
  code: number;
  message: string;
  result: any;
}

function returnFormatter(code: number, message: string, result: any = {}): IReturn {
  return { code, message, result };
}

export default returnFormatter;
