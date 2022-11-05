export interface Cache {
    connect(): Promise<void>;
    flush(): Promise<void>;
    delete(key: string): Promise<void>;
    get(key: string): Promise<string>;
    set(key: string): Promise<boolean>;
  }