<script lang="ts">
	import Prism from 'prismjs';
	import '../../app.css';
	import '../../themes/nord-prism.css';
	import CodeInput from '$lib/CodeInput.svelte';
	import { onMount } from 'svelte';

	const exampleCode = `
	<script>
		import Prism from 'prismjs';
		import CodeInput from '@srsholmes/svelte-code-input';
	<\/script>
	
	<CodeInput
		autoHeight={true}
		resize="both"
		placeholder="Input your code here..."
		prismJS={Prism}
		onChange={handleChange}
		value={'const hello = "world";'}
		language={'svelte'}
	/>
`;

	let value = `
	`;
	let mounted = false;

	function handleChange(val: string) {
		value = val;
	}

	const BEST_THEMES = [
		'atom-dark',
		'xonokai',
		'nord',
		'vsc-dark-plus',
		'synthwave84',
		'one-dark',
		'one-light',
		'material-dark',
		'material-light',
		'material-oceanic',
		'prism-one-dark',
		'darcula',
		'dracula',
		'duotone-dark',
		'duotone-earth',
		'duotone-forest',
		'duotone-light',
		'duotone-sea',
		'duotone-space'
	];

	onMount(async () => {
		await Promise.all([
			import('prismjs/components/prism-markup'),
			import('prismjs/components/prism-typescript'),
			import('prismjs/components/prism-javascript'),
			import('prismjs/components/prism-jsx'),
			import('prismjs/components/prism-css'),
			import('prism-svelte')
		]);
		await new Promise((resolve) => setTimeout(resolve, 5000));
		mounted = true;
		setInterval(async () => {
			const oldStyle = document.getElementById('theme');
			if (oldStyle) {
				document.head.removeChild(oldStyle);
			}
			const theme = BEST_THEMES[Math.floor(Math.random() * BEST_THEMES.length)];
			const res = await import(`../../prism-themes/${theme}.css?raw`);
			const style = document.createElement('style');
			style.textContent = res.default;
			style.id = `theme`;
			document.head.appendChild(style);
			document.body.dataset.theme = theme;
		}, 500);
	});

	$: {
		value = value;
	}
</script>

<div id="root">
	<div class="app">
		<div class="wrapper">
			<h1>Svelte Code Input Demo</h1>
			{#if mounted}
				<CodeInput
					autoHeight={true}
					resize="both"
					placeholder="Input your code here..."
					prismJS={Prism}
					onChange={handleChange}
					{value}
					language={'svelte'}
				/>
			{/if}
		</div>
	</div>
</div>

<style>
	.wrapper {
		width: 80%;
		margin: 0 auto;
	}
</style>
