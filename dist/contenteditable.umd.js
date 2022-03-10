(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.contenteditable = {}, global.vue));
})(this, (function (exports, vue) { 'use strict';

	function replaceAll(str, search, replacement) {
			return str.split(search).join(replacement)
		}

		var script = {
			name: 'contenteditable',
			props: {
				tag: String,
				contenteditable: {
					type: Boolean,
					default: true,
				},
				value: [Number, String],
				noHTML: {
					type: Boolean,
					default: true,
				},
				noNL: {
					type: Boolean,
					default: false,
				},
			},
			mounted: function mounted() {
				this.update_content(this.value);
			},
			computed: {},
			data: function data() {
				return {}
			},
			methods: {
				current_content: function current_content() {
					return this.noHTML ? this.$refs.element.innerText : this.$refs.element.innerHTML
				},
				update_content: function update_content(newcontent) {
					if (this.noHTML) {
						this.$refs.element.innerText = newcontent;
					} else {
						this.$refs.element.innerHTML = newcontent;
					}
				},
				update: function update(event) {
					this.$emit('input', this.current_content());
				},
				onPaste: function onPaste(event) {
					event.preventDefault();
					var text = (event.originalEvent || event).clipboardData.getData('text/plain');
					if (this.noNL) {
						text = replaceAll(text, '\r\n', ' ');
						text = replaceAll(text, '\n', ' ');
						text = replaceAll(text, '\r', ' ');
					}
					window.document.execCommand('insertText', false, text);
					this.fwdEv(event);
				},
				onKeypress: function onKeypress(event) {
					if (event.key == 'Enter' && this.noNL) {
						event.preventDefault();
						this.$emit('returned', this.current_content);
					}
					this.fwdEv(event);
				},
				fwdEv: function fwdEv(event) {
					this.$emit(event.type, event);
				},
			},
			watch: {
				value: function value(newval, oldval) {
					if (newval != this.current_content()) {
						this.update_content(newval);
					}
				},
			},
		};

	function render(_ctx, _cache, $props, $setup, $data, $options) {
	  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
	    contenteditable: $props.contenteditable,
	    onInput: $options.update,
	    onBlur: $options.update,
	    onPaste: $options.onPaste,
	    onKeypress: $options.onKeypress,
	    onKeydown: $options.fwdEv,
	    onKeyup: $options.fwdEv,
	    onMouseenter: $options.fwdEv,
	    onMouseover: $options.fwdEv,
	    onMousemove: $options.fwdEv,
	    onMousedown: $options.fwdEv,
	    onMouseup: $options.fwdEv,
	    onAuxclick: $options.fwdEv,
	    onClick: $options.fwdEv,
	    onDblclick: $options.fwdEv,
	    onContextmenu: $options.fwdEv,
	    onWheel: $options.fwdEv,
	    onMouseleave: $options.fwdEv,
	    onMouseout: $options.fwdEv,
	    onSelect: $options.fwdEv,
	    onPointerlockchange: $options.fwdEv,
	    onPointerlockerror: $options.fwdEv,
	    onDragstart: $options.fwdEv,
	    onDrag: $options.fwdEv,
	    onDragend: $options.fwdEv,
	    onDragenter: $options.fwdEv,
	    onDragover: $options.fwdEv,
	    onDragleave: $options.fwdEv,
	    onDrop: $options.fwdEv,
	    onTransitionstart: $options.fwdEv,
	    onTransitioncancel: $options.fwdEv,
	    onTransitionend: $options.fwdEv,
	    onTransitionrun: $options.fwdEv,
	    onCompositionstart: $options.fwdEv,
	    onCompositionupdate: $options.fwdEv,
	    onCompositionend: $options.fwdEv,
	    onCut: $options.fwdEv,
	    onCopy: $options.fwdEv,
	    ref: "element"
	  }, null, 8 /* PROPS */, ["contenteditable", "onInput", "onBlur", "onPaste", "onKeypress", "onKeydown", "onKeyup", "onMouseenter", "onMouseover", "onMousemove", "onMousedown", "onMouseup", "onAuxclick", "onClick", "onDblclick", "onContextmenu", "onWheel", "onMouseleave", "onMouseout", "onSelect", "onPointerlockchange", "onPointerlockerror", "onDragstart", "onDrag", "onDragend", "onDragenter", "onDragover", "onDragleave", "onDrop", "onTransitionstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onCut", "onCopy"]))
	}

	script.render = render;
	script.__file = "src/contenteditable.vue";

	var contenteditable = {
	  install: function install(Vue) {
	    Vue.component(script.name, script);
	  }
	};

	var GlobalVue = null;
	if (typeof window !== 'undefined') {
	  GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
	  GlobalVue = global.Vue;
	}
	if (GlobalVue) {
	  GlobalVue.use(contenteditable);
	}

	exports["default"] = contenteditable;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
