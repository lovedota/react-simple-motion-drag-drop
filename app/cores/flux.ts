// import {Dispatcher} from "flux";
//
// let dispatcher = new Dispatcher(),
//     dispatch = dispatcher.dispatch,
//     handlers = [];
//
// function handle(eventName: string) {
//   return (target: any, key: string, descriptor: any) => {
//     handlers.push({name: eventName, action: descriptor.value, target: target});
//
//     return descriptor;
//   };
// }
//
// dispatcher.dispatchChange = (actionType: string, ...params) => {
//   setTimeout(() => {
//     dispatcher.dispatch({
//       type: actionType,
//       params: params
//     })
//   });
// }
//
// dispatcher.register((action: any) => {
//   handlers
//     .filter(handler => handler.name === action.type)
//     .forEach(handler => handler.action.apply(handler.target, action.params));
// });
//
// export {dispatcher, handle};
