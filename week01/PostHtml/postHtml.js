(function(){
	"use strict";

	const postHtml = require('posthtml');

	let html = `
		<div class="row js-some-class">
		  <div class="col-xs-12 col-sm-6 col-md-8">.col-xs-12 .col-sm-6 .col-md-8</div>
		  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
		</div>
		<div class="row">
		  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
		  <div class="col-xs-6 col-sm-4 js-class-attr">.col-xs-6 .col-sm-4</div>
		  <!-- Optional: clear the XS cols if their content doesn't match in height -->
		  <div class="clearfix visible-xs-block"></div>
		  <div class="col-xs-6 col-sm-4 col js-another-class">.col-xs-6 .col-sm-4</div>
		</div>
	`;

	const reqexpBootstrap = /col-(xs|sm|md|lg)-\d{1,2}/g;
	const reqexpJs = /js-/g;

	const plugin = tree => {
		tree.match({}, node => {
			let nodeClass = node.attrs.class;

			if(reqexpBootstrap.test(nodeClass)) {
				node.attrs.class = nodeClass.replace(reqexpBootstrap, '').trim();
				nodeClass = node.attrs.class;
			}

			if(reqexpJs.test(node.attrs.class)) {
				node.attrs.class = nodeClass.replace(reqexpJs, 'data-');
				nodeClass = node.attrs.class;
			}

			return node;
		})
	};

	postHtml([plugin])
		.process(html)
		.then(result => console.log(result.html))
		.catch(console.error)
})();