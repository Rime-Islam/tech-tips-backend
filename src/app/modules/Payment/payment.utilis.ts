import axios from "axios";
import config from "../../config";

export const initialPayment = async (paymentData: any) => {
  const {
    transactionId,
    totalCost,
    customerName,
    custormarEmail,
  } = paymentData;
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: transactionId,
    success_url: `${config.BA_URL}/api/payment/confirmation?transactionId=${paymentData?.transactionId}&status=success`,
    fail_url: `${config.BA_URL}/api/payment/confirmation?status=failed`,
    cancel_url: "https://tech-tips-khaki.vercel.app/",
    amount: totalCost,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData?.customerName,
    cus_email: paymentData?.customerEmail,
    cus_add1: "Road 3b",
    cus_add2: "Faridpur sodor",
    cus_city: "faridpur",
    cus_state: "Dhaka",
    cus_postcode: "6400",
    cus_country: "Bangladesh",
    cus_phone: '0127846345',
    type: "json",
  });

  return response.data;
};
export const varifyPayment = async (transactionId: string) => {
  const response = await axios.get(config.payment_varifyurl!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: "json",
      request_id: transactionId,
    },
  });


  return response;
};