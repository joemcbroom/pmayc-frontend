import RestService from '@/services/RestService';

/**
 * Service implementation for interacting with the mutant images API.
 *
 * @class MutantDataService
 * @extends {RestService}
 * @exports MutantDataService
 */
export default class MutantDataService extends RestService {
	/**
	 * Creates an instance of the MutantDataService.
	 * @memberof MutantDataService
	 */
	constructor() {
		super('mutant_api_list');
	}

	/**
	 * Fetches the mutant data by multiple ids
	 * @param {number[]} ids - The ids to fetch
	 * @returns {Promise<Array>} - The response from the server.
	 * @memberof MutantDataService
	 * @throws {Error} - If the request fails.
	 * @extends RestService
	 *
	 * @example
	 * const service = new MutantDataService();
	 * const mutants = service.getMutantDataByIds([1, 2, 3, 4, 5]);
	 *
	 */
	async getMutantDataByIds(ids: number[]): Promise<NftData[]> {
		// limit 200 ids
		const idsToFetch = ids.slice(0, 200);
		const urlParams = `${idsToFetch.join(',')}`;
		const res = await this.get({ urlParams });
		return res as NftData[];
	}
}
