function handle(eventName) {
  return (target: any, key: string, descriptor: any) => {
    target.register(eventName, descriptor.value);
  };
}

export default handle;
