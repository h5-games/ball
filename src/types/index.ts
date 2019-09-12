export interface IResource {
  src: string;
  id: number | string;
  status?: string;
  resource?: HTMLImageElement;
}

export interface IUnits {
  [_id: string]: any
}
