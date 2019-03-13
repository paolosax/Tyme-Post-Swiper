/* eslint-disable valid-jsdoc */
/**
 * Tyme Post Swiper Block
 *
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Custom Components
import SwiperPostSelector from './components/SwiperPostSelector';
import {
	SwiperEffectSelect,
	SwiperPerView,
	SwiperLoopToggle,
	SwiperAutoPlayToggle,
	SwiperCenterToggle,
	SwiperMoreToggle,
} from './components';

// WP Components
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, RawHTML } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

/**
 * Register Gutenberg Block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 */
registerBlockType( 'tyme/post-swiper', {
	title: __( 'Tyme Post Swiper' ),
	icon: 'slides',
	category: 'widgets',
	keywords: [
		__( 'Post Swiper' ),
		__( 'Tyme' ),
		__( 'Carousel' ),
	],
	attributes: {
		posts: {
			type: 'array',
			default: [],
		},
		showFeaturedImage: {
			default: false,
			type: 'boolean',
		},
		swiperEffect: {
			type: 'string',
			default: 'slide',
		},
		swiperPerView: {
			type: 'number',
			default: 1,
		},
		swiperLoop: {
			type: 'boolean',
			default: true,
		},
		swiperAutoPlay: {
			type: 'boolean',
			default: false,
		},
		swiperCentered: {
			type: 'boolean',
			default: true,
		},
		swiperReadMore: {
			type: 'boolean',
			default: false,
		},
	},

	/**
	 * The Gutenberg Edit Function
	 * Renders the Block Editor in wp-admin
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: ( props ) => {
		const { posts, swiperEffect, swiperPerView, swiperLoop, swiperAutoPlay, swiperCentered, swiperReadMore } = props.attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Swiper Posts' ) }>
						<SwiperPostSelector
							onPostSelect={ ( post ) => {
								posts.push( post );
								props.setAttributes( { posts: [ ...posts ] } );
							} }
							posts={ posts }
							onChange={ ( newPost ) => {
								props.setAttributes( { posts: [ ...newPost ] } );
							} }
							postType={ 'post' }
							showSuggestions={ true }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Swiper Settings' ) }>
						<SwiperEffectSelect
							onChange={ ( newEffect ) => {
								props.setAttributes( { swiperEffect: newEffect } );
							} }
							value={ swiperEffect }
						/>
						<SwiperPerView
							onChange={ ( newPerView ) => {
								props.setAttributes( { swiperPerView: newPerView } );
							} }
							value={ swiperPerView }
						/>
						<SwiperLoopToggle
							onChange={ ( loopPosts ) => {
								props.setAttributes( { swiperLoop: loopPosts } );
							} }
							value={ swiperLoop }
						/>
						<SwiperCenterToggle
							onChange={ ( centerVal ) => {
								props.setAttributes( { swiperCentered: centerVal } );
							} }
							value={ swiperCentered }
						/>
						<SwiperAutoPlayToggle
							onChange={ ( autoPlayVal ) => {
								props.setAttributes( { swiperAutoPlay: autoPlayVal } );
							} }
							value={ swiperAutoPlay }
						/>
						<SwiperMoreToggle
							onChange={ ( moreVal ) => {
								props.setAttributes( { swiperReadMore: moreVal } );
							} }
							value={ swiperReadMore }
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className="swiper-container"
					data-swiper-effect={ swiperEffect }
					data-swiper-perview={ swiperPerView }
					data-swiper-loop={ swiperLoop }
					data-swiper-autoplay={ swiperAutoPlay }
					data-swiper-centered={ swiperCentered }
				>
					<div className="swiper-wrapper">
						{ posts.map( post => (
							<div className="swiper-slide" key={ post.id }>
								<h2><a href={ post.url }>{ post.title }</a></h2>
								<RawHTML>{ post.excerpt }</RawHTML>
								{ swiperReadMore ? (
									<div className="read-more">
										<a href={ post.url }>{ __( 'Read more...' ) }</a>
									</div>
								) : '' }
							</div>
						) ) }
					</div>
				</div>
			</Fragment>
		);
	},

	/**
	 * The Gutenberg Save Function
	 * Tells WP how to save the rendered block markup to the database.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: ( props ) => {
		const { posts, swiperEffect, swiperPerView, swiperLoop, swiperAutoPlay, swiperCentered, swiperReadMore } = props.attributes;

		return (
			<div
				className="swiper-container"
				data-swiper-effect={ swiperEffect }
				data-swiper-perview={ swiperPerView }
				data-swiper-loop={ swiperLoop }
				data-swiper-autoplay={ swiperAutoPlay }
				data-swiper-centered={ swiperCentered }
			>
				<div className="swiper-wrapper">
					{ posts.map( post => (
						<div className="swiper-slide" key={ post.id }>
							<h2><a href={ post.url }>{ post.title }</a></h2>
							<RawHTML>{ post.excerpt }</RawHTML>
							{ swiperReadMore ? (
								<div className="read-more">
									<a href={ post.url }>{ __( 'Read more...' ) }</a>
								</div>
							) : '' }
						</div>
					) ) }
				</div>
			</div>
		);
	},
} );
