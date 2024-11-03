import { $authHost } from '../../../shared/api/axios.instances';

class Reward {
	#host = $authHost;
}

export default new Reward();
