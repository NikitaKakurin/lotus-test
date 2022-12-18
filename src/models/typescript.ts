export interface IParticipants {
  name: string;
  qualityActivities: string;
  productionTime: string;
  warranty: string;
  paymentTerms: number;
  cost: number;
  actions: string;
  id: number;
  isOnline: boolean;
}

export interface ITradeData {
  title: string;
  minDiscount: number;
  wantedCost: number;
  participants: IParticipants[];
  startTradeTime: number;
}
