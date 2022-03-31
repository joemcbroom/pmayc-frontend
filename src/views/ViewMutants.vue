<script setup lang="ts">
import DefaultButton from '@/components/DefaultButton.vue';
import { useCryptoStore } from '@/store/crypto';
import { onMounted, Ref, ref } from 'vue';
import MutantDataService from '@/services/MutantDataService';
import gsap from 'gsap';
import LoadingSpinners from '@/components/LoadingSpinners.vue';
import { storeToRefs } from 'pinia';

const crypto = useCryptoStore();

const { getNFTs } = crypto;

const { isBusy } = storeToRefs(crypto);

const nftsOwned = ref([]) as Ref<number[]>;
let nftData = ref([]) as Ref<NftData[]>;

const getNFTsFromContract = async () => {
	try {
		isBusy.value = true;
		const res = await getNFTs();
		if (!res || !res.length) {
			return;
		}
		nftsOwned.value = res;
		const mutantDataService = new MutantDataService();
		const nftDataFromDb = (await mutantDataService.getMutantDataByIds(
			nftsOwned.value
		)) as NftData[];
		nftData.value = nftDataFromDb;
		isBusy.value = false;
	} catch (e) {
		console.error(e);
	} finally {
		isBusy.value = false;
	}
};

const beforeEnter = (el) => {
	el.style.opacity = 0;
	el.style.transform = 'translateY(100px)';
};

const enter = (el, done: gsap.Callback) => {
	const index = el.dataset.index as string;
	gsap.to(el, {
		opacity: 1,
		y: 0,
		duration: 0.5,
		onComplete: done,
		delay: +index * 0.2,
	});
};
</script>
<template>
	<default-button
		text="See your mutants"
		:action="getNFTsFromContract"
		:disabled="isBusy"
	/>
	<loading-spinners v-if="isBusy" />
	<transition-group
		appear
		name="fade"
		tag="div"
		:css="false"
		@before-enter="beforeEnter"
		@enter="enter"
		v-if="nftData.length"
		class="mt-4 flex flex-wrap justify-center gap-6"
	>
		<div
			v-for="(nft, i) in nftData"
			:key="nft.token_id"
			class="aspect-1 w-3/12"
			:data-index="i"
		>
			<img
				:src="nft.secure_url"
				class="scale-100 transform transition-transform duration-500 hover:scale-110"
			/>
		</div>
	</transition-group>
</template>
<style lang="scss"></style>
