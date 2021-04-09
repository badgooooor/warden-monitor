import { PriceService } from "../services/priceService";
import { Web3Service } from "../services/web3Service";
import MasterchefAbi from "../abi/MasterChef.json";
import { TokenHelper } from "../services/tokenHelper";
import { Masterchef } from "../services/masterchef";

const web3Service = new Web3Service();
const priceService = new PriceService();
const masterchefAddress = "0xde866dD77b6DF6772e320dC92BFF0eDDC626C674";

const contract = web3Service.getContract(MasterchefAbi, masterchefAddress);
const helper = new TokenHelper(web3Service, priceService);
const masterchef = new Masterchef(contract, helper);

export { contract, helper, masterchef };
