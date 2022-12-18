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
  participants: IParticipants[];
  startTradeTime: number;
}
