interface GiftCounterProps {
  id: number;
  name: string;
}

export class GiftCounter {
  id: number;
  name: string;

  constructor(props: GiftCounterProps) {
    this.id = props.id;
    this.name = props.name;
  }

  static create(props: GiftCounter): GiftCounter {
    return new GiftCounter(props);
  }
}
