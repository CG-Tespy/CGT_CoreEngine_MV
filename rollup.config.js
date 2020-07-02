import resolve from 'rollup-plugin-node-resolve';

export default {
	input: "./CGT_CoreEngine_Main.js",
	output: 
	{
		file: "./CGT_CoreEngine_Main_Bundle.js",
		format: 'iife'
	},

	plugins: [
		resolve({
		  jsnext: true,
		  module: true
		}
		)
	  ]
	
};