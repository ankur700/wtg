export const FAQS = [
	{
		id: 1,
		title: 'How can i generate block themes?',
		content: "Currently we don't have such feature, but we are working on it."
	},
	{
		id: 2,
		title: 'My website is not working. What should I do?',
		content:
			'Check if you have included all required files when generating theme including any external library files like bootstrap, swiper etc. If you have included all required files, then please contact us. We will look into it.'
	}
];

export const Steps = [
	{
		id: 1,
		title: 'Prerequisite',
		description:
			"Remove any loading screens from index.html file, also optionally remove the links to css files and js files from the index.html file. Stylesheets and scripts loaded from cdn's should be downloaded in advance.",
		svgPaths: ['M10 10l2 -2v8']
	},
	{
		id: 2,
		title: 'Upload',
		description:
			'Head to generate theme page and upload your index.html file, main.css file, main.js file and other css and js files(custom js libraries and custom css libraries files) according to the input label.',
		svgPaths: ['M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3']
	},
	{
		id: 3,
		title: 'Convert',
		description:
			'Generate your wordpress theme by clicking the generate button and download the theme zip file.',
		svgPaths: [
			'M10 9a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1'
		]
	},
	{
		id: 4,
		title: 'Install',
		description:
			'Install your wordpress theme by opening wordpress admin panel and click appearance -> themes and click the upload button, now select the theme zip file and click install.',
		svgPaths: ['M10 8v3a1 1 0 0 0 1 1h3', 'M14 8v8']
	}
];
