export type MayBe<T> = T | null;

export type TTask = {
  id?: number;
  date: MayBe<number>;
  urgent: boolean;
  name: MayBe<string>;
  description: MayBe<string>;
  status: MayBe<boolean>;
};
