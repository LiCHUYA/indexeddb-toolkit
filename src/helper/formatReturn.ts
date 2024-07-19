function returnFormatter(
  code: number,
  message: string,
  result: any = {},
) {
  return {code, message, result}
}

export default returnFormatter;


// import { ConsoleType } from '../constant/code';
//
// // interface IntFormatter {
// //   type: number;
// //   code: number;
// //   message: string;
// //   result: any;
// // }
//
// function returnFormatter(
//   code: number,
//   message: string,
//   result: any = {},
//   type: string = 'Log'
// ) {
//   if (ConsoleType[type] && typeof console[ConsoleType[type]] === 'function') {
//     console[ConsoleType[type]]({ code, message, result });
//     return { code, message, result }
//   } else {
//     console.log({ code, message, result });
//   }
// }
//
// export default returnFormatter;
