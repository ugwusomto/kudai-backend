import { v4 as uuidv4 } from "uuid";
import { IPaystackPaymentObject } from "../interfaces/transaction-interface";
import axios from "axios";


class PaymentService {


  private static generatePaystackReference(): string {
    return uuidv4();
  }

  public static async generatePaystackPaymentUrl(email: string, amount: number): Promise<IPaystackPaymentObject | null> {
    try {
      const amountInKobo = amount * 100;
      const params = {
        email,
        amount: amountInKobo,
        channels: ["card"],
        callback_url: `${process.env.PAYSTACK_CALLBACK_URL}`,
        reference: PaymentService.generatePaystackReference()
      }
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await axios.post("https://api.paystack.co/transaction/initialize", params, config);
      if (data && data.status) {
        return data.data
      }
      return null;
    } catch (error) {
      return null;
    }
  }

}

export default PaymentService;
