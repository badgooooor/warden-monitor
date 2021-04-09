import axios from "axios";
import { tokens } from "../constants/coingecko";

export class PriceService {
  getPrice = async (address: string) => {
    try {
      let data = {};
      let id = "";
      if (address in tokens) {
        id = tokens[address].id as string;
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
        );
        data = res.data;
        console.log(data);
      }
      return 0;
    } catch (e) {
      console.log("Error getting price", e);
    }
    return 0;
  };
}
