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
	attributes: NftTrait[];
	image: string;
	secure_url: string;
	token_id: number;
}
