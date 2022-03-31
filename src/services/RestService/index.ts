import { useErrorStore } from '@/store/error';
/**
 * Base class for all services.
 * This class is used to encapsulate common API interaction in a single class,
 *
 * @class RestService
 * @export RestService
 */

export default class RestService {
	endpointUrl: string;
	isBusy = false;

	/**
	 * Creates an instance of the RestService.
	 * @param {string} endpoint - The resource URI for the class that extends
	 * this class.
	 */
	constructor(endpoint: string) {
		this.endpointUrl = `${
			import.meta.env.VITE_IMAGES_API_URL ||
			'https://gutdraw.pythonanywhere.com'
		}/${endpoint}`;
	}

	/**
	 * Fetches the resource from the server.
	 *
	 * @param {Object} params - The parameters to pass to the server.
	 * @returns {Promise<Object>} - The response from the server.
	 * @memberof RestService
	 *
	 */
	async get({
		params,
		urlParams,
	}: RestServiceGetOptions): Promise<[] | undefined> {
		const errorStore = useErrorStore();
		this.isBusy = true;
		const url = urlParams
			? `${this.endpointUrl}/${urlParams}`
			: this.endpointUrl;
		try {
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params),
			});
			return await res.json();
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				errorStore.setError(error);
			}
		} finally {
			this.isBusy = false;
		}
	}
}
