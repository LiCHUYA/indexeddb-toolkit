import { ConsoleType } from '../constant/code';
function returnFormatter(
  code: number,
  message: string,
  result: any = {},
  type: string = 'Log'
) {
  if (ConsoleType[type] && typeof console[ConsoleType[type]] === 'function') {
    console[ConsoleType[type]]({ code, message, result });
  } else {
    console.log({ code, message, result }); // 默认行为，防止类型错误
  }
}

export default returnFormatter;
