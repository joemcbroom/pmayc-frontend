interface RestServiceGetOptions {
	params?: {};
	urlParams?: string;
}

interface UserType {
	account: string;
	balance: string;
	profileImage?: string;
}

interface NftTrait {
	trait_type: string;
	value: string;
}
interface NftData {
	attributes: string;
	image: string;
	secure_url: string;
	token_id: number;
	traits: NftTrait[];
}

interface ImportMeta {
	env: {
		GITHUB_AUTH_TOKEN: string;
		NODE_ENV: 'development' | 'production';
		PORT?: string;
		PWD: string;
		VITE_POLYGON_API_KEY: string;
		VITE_IMAGES_API_URL: string;
	};
}
