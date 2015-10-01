declare var km: KeyMirror;

declare module 'keymirror' {
  export default km;
}

interface KeyMirror {
  (obj: any): any;
}
