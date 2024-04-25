export interface PaymentDataResponse {
  id: number;
  createAt: string;
  updateAt: string;
  deleteAt: string;
  amount: number;
  status: string;
  paymentMethod: {
    id: number;
    createAt: string;
    updateAt: string;
    deleteAt: string;
    methodName: string;
    methodDescription: string;
    active: boolean;
  };
  active: boolean;
}
