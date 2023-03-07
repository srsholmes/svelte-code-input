<script lang="ts">
	import '../app.css';
	import '../themes/nord-prism.css';
	import '../themes/nord-highlight.css';
	import highlightjs from 'highlight.js';
	import Prism from 'prismjs';
	import CodeInput from '$lib/CodeInput.svelte';
	import { onMount } from 'svelte';

	const exampleCode = `import { YalPlugin, YalPluginsConfig } from '@yal-app/types';

export const plugin: YalPlugin = (args) => {
  args.setState({
    heading: 'Hello World',
    state: [
      {
        name: 'This is the first result',
        description: 'This is the first result description',
        metadata: {
          another: 'https://github.com/srsholmes/yal/',
          toto: 11234,
        },
      },
    ],
    action: (actionArgs) => {
      console.log('actionArgs', actionArgs.item.metadata);
      args.utils.setToast({
        type: 'info',
        message: \`You clicked on \${actionArgs.item.name}\`,
      });
      console.log(actionArgs.item.description);
    },
  });
};

export const config: YalPluginsConfig = {
  keywords: ['hello'],
  keepOpen: true,
};

export default plugin;
`;

	let value = exampleCode;
	let languagePrism = 'typescript';
	let languageHighlight = 'typescript';
	let mounted = false;

	function handleChange(val: string) {
		value = val;
	}

	onMount(async () => {
		await Promise.all([
			import('prismjs/components/prism-markup'),
			import('prismjs/components/prism-typescript'),
			import('prismjs/components/prism-javascript'),
			import('prismjs/components/prism-jsx'),
			import('prismjs/components/prism-markup'),
			import('prismjs/components/prism-css'),
			import('highlight.js/lib/languages/typescript'),
			import('highlight.js/lib/languages/javascript'),
			import('highlight.js/lib/languages/css')
		]);
		mounted = true;
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
				<div>
					<h2>PrismJS</h2>
					<CodeInput
						autoHeight={true}
						resize="both"
						placeholder="Input your code here..."
						prismJS={Prism}
						onChange={handleChange}
						{value}
						language={languagePrism}
					/>
				</div>
				<select
					class={'select'}
					value={languagePrism}
					on:input={(e) => {
						return (languagePrism = e.currentTarget.value);
					}}
				>
					<option value="javascript">JavaScript</option>
					<option value="typescript">TypeScript</option>
					<option value="jsx">JSX</option>
					<option value="css">CSS</option>
					<option value="html">HTML</option>
					<option value="json">JSON</option>
				</select>
				<div>
					<h2>Highlight.js</h2>
					<CodeInput
						autoHeight={true}
						resize="both"
						placeholder="Input your code here..."
						{highlightjs}
						onChange={handleChange}
						{value}
						language={languageHighlight}
					/>
				</div>
				<select
					class={'select'}
					value={languageHighlight}
					on:input={(e) => (languageHighlight = e.currentTarget.value)}
				>
					<option value="javascript">JavaScript</option>
					<option value="typescript">TypeScript</option>
					<option value="jsx">JSX</option>
					<option value="css">CSS</option>
					<option value="html">HTML</option>
					<option value="json">JSON</option>
				</select>
			{/if}
		</div>
	</div>
</div>

<style>
	.wrapper {
		width: 80%;
		margin: 0 auto;
	}
	.select {
		margin-top: 1rem;
		width: 100%;
		min-width: 15ch;
		max-width: 30ch;
		border: 1px solid var(--select-border);
		border-radius: 0.25em;
		padding: 0.5em 0.5em;
		font-size: 1rem;
		cursor: pointer;
		line-height: 1.1;
		background-color: rgb(46, 52, 64);
		color: rgb(255, 255, 255);
	}
</style>
