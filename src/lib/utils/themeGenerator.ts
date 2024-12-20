import JSZip from 'jszip';

export interface WordPressThemeConfig {
	name: string;
	description: string;
	version: string;
	author: string;
	authorUri: string;
	RequiresAtLeast: string;
	TestedUpTo: string;
	RequiresPhp: string;
	License: string;
	LicenseUri: string;
	TextDomain: string;
}

export class ThemeGenerator {
	private readonly PRIORITY_LIBS = [
		{ name: 'jquery', regex: /jquery/i },
		{ name: 'bootstrap', regex: /bootstrap/i }
	];

	prioritizeJsFiles(files: File[]): File[] {
		// Separate files into priority and standard groups
		const priorityFiles: File[] = [];
		const standardFiles: File[] = [];

		// Categorize files
		files.forEach((file) => {
			const isPriorityFile = this.PRIORITY_LIBS.some((lib) => lib.regex.test(file.name));

			if (isPriorityFile) {
				priorityFiles.push(file);
			} else {
				standardFiles.push(file);
			}
		});

		// Sort priority files by predefined order
		const sortedPriorityFiles = this.sortPriorityFiles(priorityFiles);

		// Combine priority files with standard files
		return [...sortedPriorityFiles, ...standardFiles];
	}

	private sortPriorityFiles(files: File[]): File[] {
		return this.PRIORITY_LIBS.map((lib) => files.find((file) => lib.regex.test(file.name))).filter(
			(file): file is File => file !== undefined
		);
	}

	private defaultConfig: WordPressThemeConfig = {
		name: 'Generated Theme',
		description: 'Automatically generated WordPress theme',
		version: '1.0.0',
		author: 'Theme Converter App',
		authorUri: 'https://github.com/ankur700/wordpress-theme-converter',
		RequiresAtLeast: '6.7',
		TestedUpTo: '6.7',
		RequiresPhp: '7.2',
		License: 'GNU General Public License v2 or later',
		LicenseUri: 'http://www.gnu.org/licenses/gpl-2.0.html',
		TextDomain: 'generatedtheme'
	};

	async generateTheme(
		htmlContent: string,
		cssContent: string,
		jsContent: string,
		additionalCssFiles: File[] = [],
		additionalJsFiles: File[] = [],
		screenshotFile?: File | null,
		config?: Partial<WordPressThemeConfig>
	): Promise<Blob | undefined> {
		// Merge default and provided config
		const themeConfig = { ...this.defaultConfig, ...config };

		// Create theme directory structure
		const themeFolder = new JSZip();

		// Generate style.css (WordPress theme requirement)
		const styleCssContent = this.generateStyleCss(themeConfig);
		themeFolder?.file('style.css', styleCssContent);

		// Add main assets
		themeFolder?.file('assets/js/script.js', this.processJs(jsContent));
		themeFolder?.file('assets/css/main.css', this.processCss(cssContent));

		// Add screenshot if provided else generate a placeholder
		if (screenshotFile) {
			const screenshotBlob = await screenshotFile.arrayBuffer();
			themeFolder?.file('screenshot.png', screenshotBlob);
		} else {
			const screenshotBlob = await this.generateScreenshot();
			themeFolder?.file('screenshot.png', screenshotBlob);
		}

		// Add additional CSS and JS files
		for (const file of additionalCssFiles) {
			const fileContent = await file.text();
			if (fileContent) {
				themeFolder?.file(`assets/css/${file.name}`, fileContent);
			}
		}
		for (const file of additionalJsFiles) {
			const fileContent = await file.text();
			if (fileContent) {
				themeFolder?.file(`assets/js/${file.name}`, fileContent);
			}
		}

		// Update functions.php to enqueue additional files
		const functionsPhpContent = this.generateFunctionsPhp(
			additionalCssFiles,
			this.prioritizeJsFiles(additionalJsFiles)
		);

		// Add processed files
		themeFolder.file('index.php', this.processHtml(htmlContent));

		// Add additional theme support functions
		themeFolder.file('functions.php', this.generateFunctionsPhp());
		// Generate WordPress-specific files with extracted content
		themeFolder.file('header.php', this.generateHeaderPhp());
		themeFolder.file('footer.php', this.generateFooterPhp());
		themeFolder.file('functions.php', functionsPhpContent);

		// Generate the zip
		return themeFolder?.generateAsync({ type: 'blob' });
	}

	private generateStyleCss(config: WordPressThemeConfig): string {
		return (
			`/*
      Theme Name: ${config.name}
      Author: ${config.author}
      Author URI: ${config.authorUri}
      Description: ${config.description}
      Requires at least: ${config.RequiresAtLeast}
      Tested up to: ${config.TestedUpTo}
      Requires PHP: ${config.RequiresPhp}
      Version: ${config.version}
      License: ${config.License}
      License URI: ${config.LicenseUri}
      Text Domain: ${config.TextDomain}
      */` +
			'\n' +
			`/*
      * Link styles
      * https://github.com/WordPress/gutenberg/issues/42319
      */` +
			'\n' +
			`a {
        text-decoration-thickness: 1px !important;
        text-underline-offset: .1em;
      }` +
			'\n' +
			`/* Focus styles */` +
			'\n' +
			`:where(.wp-site-blocks *:focus) {
          outline-width: 2px;
          outline-style: solid;
        }` +
			'\n' +
			`/* Increase the bottom margin on submenus, so that the outline is visible. */` +
			'\n' +
			`.wp-block-navigation .wp-block-navigation-submenu .wp-block-navigation-item:not(:last-child) {
        margin-bottom: 3px;
      }` +
			'\n' +
			`/* Increase the outline offset on the parent menu items, so that the outline does not touch the text. */` +
			'\n' +
			`.wp-block-navigation .wp-block-navigation-item .wp-block-navigation-item__content {
        outline-offset: 4px;
      }` +
			'\n' +
			`/* Remove outline offset from the submenus, otherwise the outline is visible outside the submenu container. */` +
			'\n' +
			`.wp-block-navigation .wp-block-navigation-item ul.wp-block-navigation__submenu-container .wp-block-navigation-item__content {
        outline-offset: 0;
      }` +
			'\n' +
			`/*
      * Progressive enhancement to reduce widows and orphans
      * https://github.com/WordPress/gutenberg/issues/55190
      */` +
			'\n' +
			`
     h1, h2, h3, h4, h5, h6, blockquote, caption, figcaption, p {
       text-wrap: pretty;
     }` +
			'\n' +
			`/*
      * Change the position of the more block on the front, by making it a block level element.
      * https://github.com/WordPress/gutenberg/issues/65934
     */` +
			'\n' +
			`.more-link {
       display: block;
     }` +
			'\n' +
			`}` +
			'\n'
		);
	}

	private processHtml(html: string): string {
		// Create a DOM parser
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');

		// Remove all link tags (CSS) from head
		const headLinks = doc.head.querySelectorAll('link');
		headLinks.forEach((link) => link.remove());

		// Remove all script tags from head
		const headScripts = doc.head.querySelectorAll('script');
		headScripts.forEach((script) => script.remove());

		// Remove all script tags from footer
		const footerScripts = doc.querySelectorAll('footer script, body > script:last-child');
		footerScripts.forEach((script) => script.remove());

		// Convert back to string, preserving WordPress theme structure
		let processedHtml = doc.documentElement.innerHTML;

		// Wrap with WordPress theme tags
		processedHtml = `<?php get_header(); ?>\n<div id="primary" class="content-area">\n<main id="main" class="site-main">\n${processedHtml}\n</main>\n</div>\n<?php get_footer(); ?>`;

		return processedHtml;
	}

	// Utility function to clean HTML (optional, but can be helpful)
	private cleanHtml(html: string): string {
		// Remove comments
		html = html.replace(/<!--[\s\S]*?-->/g, '');

		// Remove empty attributes
		html = html.replace(/\s+[\w-]+=['"](['"])\1/g, '');

		// Trim excessive whitespace
		html = html.replace(/\s+/g, ' ').trim();

		return html;
	}

	private processCss(css: string): string {
		// Add WordPress-specific resets or modifications if needed
		return css;
	}

	private processJs(js: string): string {
		// Wrap JavaScript for WordPress compatibility
		// return `(function($) {
		//   ${js}
		// })(jQuery);`;
		return js;
	}

	private generateHeaderPhp(): string {
		return `<!DOCTYPE html>
      <html <?php language_attributes(); ?>>
      <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php wp_title( '|', true, 'right' ); ?></title>
        <link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_uri() ); ?>" type="text/css" />
        <?php wp_head(); ?>
      </head>
      <body <?php body_class(); ?>>
      <?php wp_body_open(); ?>`;
	}

	private generateFooterPhp(): string {
		return `
      <?php wp_footer(); ?>
      </body>
      </html>`;
	}

	private sanitizeFileName(name: string): string {
		return name
			.toLowerCase()
			.replace(/[^a-z0-9]/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');
	}

	private async generateScreenshot(): Promise<Blob> {
		// Generate a placeholder screenshot
		const canvas = new OffscreenCanvas(880, 660);
		const ctx = canvas.getContext('2d');

		if (ctx) {
			ctx.fillStyle = '#f0f0f0';
			ctx.fillRect(0, 0, 1200, 900);

			ctx.fillStyle = '#333';
			ctx.font = '40px Arial';
			ctx.textAlign = 'center';
			ctx.fillText('WordPress Theme', 440, 330);
		}

		return await canvas.convertToBlob();
	}

	private generateFunctionsPhp(
		additionalCssFiles: File[] = [],
		additionalJsFiles: File[] = []
	): string {
		// Base enqueue functions
		const functionsContent = `<?php

			/**
		 * Generated Theme functions and definitions.
		 *
		 * @link https://developer.wordpress.org/themes/basics/theme-functions/
		 *
		 * @package WordPress
		 * @subpackage Generated Theme
		 * @since Generated Theme 1.0
		 */

		// Adds theme support for post formats.
		if ( ! function_exists( 'generated_theme_post_format_setup' ) ) :
			/**
			 * Adds theme support for post formats.
			 *
			 * @since Generated Theme 1.0
			 *
			 * @return void
			 */
			function generatedtheme_post_format_setup() {
				add_theme_support( 'post-formats', array( 'aside', 'audio', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video' ) );
			}
		endif;
		add_action( 'after_setup_theme', 'generatedtheme_post_format_setup' );

		// Enqueues editor-style.css in the editors.
		if ( ! function_exists( 'generatedtheme_editor_style' ) ) :
			/**
			 * Enqueues editor-style.css in the editors.
			 *
			 * @since Generated Theme 1.0
			 *
			 * @return void
			 */
			function generatedtheme_editor_style() {
				add_editor_style( get_parent_theme_file_uri( 'assets/css/editor-style.css' ) );
			}
		endif;
		add_action( 'after_setup_theme', 'generatedtheme_editor_style' );

		// Enqueues style.css on the front.
		if ( ! function_exists( 'generatedtheme_enqueue_styles' ) ) :
			/**
			 * Enqueues style.css on the front.
			 *
			 * @since Generated Theme 1.0
			 *
			 * @return void
			 */
			function generatedtheme_enqueue_styles() {
				wp_enqueue_style(
					'generatedtheme-style',
					get_parent_theme_file_uri( 'style.css' ),
					array(),
					wp_get_theme()->get( 'Version' )
				);
			}
		endif;
		add_action( 'wp_enqueue_scripts', 'generatedtheme_enqueue_styles' );

		// Registers custom block styles.
		if ( ! function_exists( 'generatedtheme_block_styles' ) ) :
			/**
			 * Registers custom block styles.
			 *
			 * @since Generated Theme 1.0
			 *
			 * @return void
			 */
			function generatedtheme_block_styles() {
				register_block_style(
					'core/list',
					array(
						'name'         => 'checkmark-list',
						'label'        => __( 'Checkmark', 'generatedtheme' ),
						'inline_style' => '
						ul.is-style-checkmark-list {
							list-style-type: "\xB93";
						}

						ul.is-style-checkmark-list li {
							padding-inline-start: 1ch;
						}',
					)
				);
			}
		endif;
		add_action( 'init', 'generatedtheme_block_styles' );

		// Registers pattern categories.
		if ( ! function_exists( 'generatedtheme_pattern_categories' ) ) :
			/**
			 * Registers pattern categories.
			 *
			 * @since Generated Theme 1.0
			 *
			 * @return void
			 */
			function generatedtheme_pattern_categories() {

				register_block_pattern_category(
					'generatedtheme_page',
					array(
						'label'       => __( 'Pages', 'generatedtheme' ),
						'description' => __( 'A collection of full page layouts.', 'generatedtheme' ),
					)
				);

				register_block_pattern_category(
					'generatedtheme_post-format',
					array(
						'label'       => __( 'Post formats', 'generatedtheme' ),
						'description' => __( 'A collection of post format patterns.', 'generatedtheme' ),
					)
				);
			}
		endif;
		add_action( 'init', 'generatedtheme_pattern_categories' );

		// Registers block binding sources.
		if ( ! function_exists( 'generatedtheme_register_block_bindings' ) ) :
			/**
			 * Registers the post format block binding source.
			 *
			 * @since Generated Theme 1.0
			 *
			 * @return void
			 */
			function generatedtheme_register_block_bindings() {
				register_block_bindings_source(
					'generatedtheme/format',
					array(
						'label'              => _x( 'Post format name', 'Label for the block binding placeholder in the editor', 'generatedtheme' ),
						'get_value_callback' => 'generatedtheme_format_binding',
					)
				);
			}
		endif;
		add_action( 'init', 'generatedtheme_register_block_bindings' );

		// Registers block binding callback function for the post format name.
		if ( ! function_exists( 'generatedtheme_format_binding' ) ) :
			/**
			 * Callback function for the post format name block binding source.
			 *
			 * @since Generated Theme 1.0
			 *
			 * @return string|void Post format name, or nothing if the format is 'standard'.
			 */
			function generatedtheme_format_binding() {
				$post_format_slug = get_post_format();

				if ( $post_format_slug && 'standard' !== $post_format_slug ) {
					return get_post_format_string( $post_format_slug );
				}
			}
		endif;


      function theme_enqueue_styles() {
      // Main stylesheet
      wp_enqueue_style('main-style', get_template_directory_uri() . '/assets/css/main.css');
      wp_enqueue_script('custom-script', get_template_directory_uri() . '/script.js', array('jquery'), '1.0.0', true);
      // Additional CSS files
      ${additionalCssFiles
				.map(
					(file, index) => `
      wp_enqueue_style('additional-style-${index}', get_template_directory_uri() . '/assets/css/${file.name}');

      `
				)
				.join('\n')}
      }
      add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

      function theme_enqueue_scripts() {
      // Additional JS files
      ${additionalJsFiles
				.map((file, index) => {
					if (file.name.includes('jquery')) {
						return `wp_enqueue_script('additional-script-${index}', get_template_directory_uri() . '/assets/js/${file.name}', array('jquery'), '', true);`;
					}
				})
				.join('\n')}
      }
      add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');

      // Register navigation and widget areas
      function register_theme_support() {
      // Register navigation menus
      register_nav_menus(array(
          'primary-menu' => __('Primary Menu', 'converted-theme'),
      ));

      // Add theme support
      add_theme_support('title-tag');
      add_theme_support('post-thumbnails');
      add_theme_support('responsive-embeds');
      add_theme_support('wp-block-styles');
      }
      add_action('after_setup_theme', 'register_theme_support');

      // Register widget areas
      function register_theme_widgets() {
        register_sidebar(array(
            'name'          => __('Sidebar', 'converted-theme'),
            'id'            => 'sidebar-1',
            'description'   => __('Add widgets here to appear in your sidebar.', 'converted-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        ));
      }
      add_action('widgets_init', 'register_theme_widgets');
      `;

		return functionsContent;
	}
}
