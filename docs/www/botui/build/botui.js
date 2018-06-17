/*
 * botui 0.3.4
 * A JS library to build the UI for your bot
 * https://botui.org
 *
 * Copyright 2018, Moin Uddin
 * Released under the MIT license.
*/

(function (root, factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.BotUI = factory(root));
    });
  } else {
    root.BotUI = factory(root);
  }
}(typeof window !== 'undefined' ? window : this, function (root, undefined) {
  "use strict";

  var BotUI = (function (id, opts) {

    opts = opts || {};

    if(!id) {
      throw Error('BotUI: Container id is required as first argument.');
    }

    if(!document.getElementById(id)) {
      throw Error('BotUI: Element with id #' + id + ' does not exist.');
    }

    if(!root.Vue && !opts.vue) {
      throw Error('BotUI: Vue is required but not found.');
    }

    var _botApp, // current vue instance.
    _options = {
      debug: false,
      fontawesome: true,
      searchselect: true
    },
    _container, // the outermost Element. Needed to scroll to bottom, for now.
    _interface = {}, // methods returned by a BotUI() instance.
    _actionResolve,
    _markDownRegex = {
      icon: /!\(([^\)]+)\)/igm, // !(icon)
      image: /!\[(.*?)\]\((.*?)\)/igm, // ![aleternate text](src)
      link: /\[([^\[]+)\]\(([^\)]+)\)(\^?)/igm // [text](link) ^ can be added at end to set the target as 'blank'
    },
    _fontAwesome = 'https://use.fontawesome.com/ea731dcb6f.js',
    _esPromisePollyfill = 'https://cdn.jsdelivr.net/es6-promise/4.1.0/es6-promise.min.js', // mostly for IE
    _searchselect =  "https://unpkg.com/vue-select@2.4.0/dist/vue-select.js";

    root.Vue = root.Vue || opts.vue;

    // merge opts passed to constructor with _options
    for (var prop in _options) {
      if (opts.hasOwnProperty(prop)) {
        _options[prop] = opts[prop];
      }
    }

    if(!root.Promise && !Promise && !options.promise) {
      loadScript(_esPromisePollyfill);
    }

    function _linkReplacer(match, $1, $2, $3) {
      var _target = $3 ? 'blank' : ''; // check if '^' sign is present with link syntax
      return "<a class='botui-message-content-link' target='" + _target + "' href='" + $2 +"'>" + $1 + "</a>";
    }

    function _parseMarkDown(text) {      
      return text
                 .replace(_markDownRegex.image, "<img class='botui-message-content-image' src='$2' alt='$1' />")
                 .replace(_markDownRegex.icon, "<i class='botui-icon botui-message-content-icon fa fa-$1'></i>")
                 .replace(_markDownRegex.link, _linkReplacer);
    }

    function loadScript(src, cb) {
      var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = src;

          if(cb) {
            script.onload = cb;
          }

      document.body.appendChild(script);
    }

    function _handleAction(text) {
      if(_instance.action.addMessage) {
        _interface.message.human({
          delay: 100,
          content: text
        });
      }
      _instance.action.show = !_instance.action.autoHide;
    }

    var _botuiComponent = {
      //template: '<div class=\"botui botui-container\" v-botui-container><div class=\"botui-messages-container\"><div v-for=\"msg in messages\" class=\"botui-message\" :class=\"msg.cssClass\" v-botui-scroll><transition name=\"slide-fade\"><div v-if=\"msg.visible\" :class=\"[{human: msg.human, \'botui-message-content\': true}, msg.type]\"><span v-if=\"msg.type == \'text\'\" v-text=\"msg.content\" v-botui-markdown></span> <iframe v-if=\"msg.type == \'embed\'\" :src=\"msg.content\" frameborder=\"0\" allowfullscreen></iframe></div></transition><div v-if=\"msg.loading\" class=\"botui-message-content loading\"><i class=\"dot\"></i><i class=\"dot\"></i><i class=\"dot\"></i></div></div></div><div class=\"botui-actions-container\"><transition name=\"slide-fade\"><div v-if=\"action.show\" v-botui-scroll><form v-if=\"action.type == \'text\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\" action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button></form><form v-if=\"action.type == \'select\'\" class=\"botui-actions-select\" @submit.prevent=\"handle_action_select()\" :class=\"action.cssClass\"><i v-if=\"action.select.icon\" class=\"botui-icon botui-action-select-icon fa\" :class=\"\'fa-\' + action.select.icon\"></i><v-select v-if=\"action.select.searchselect && !action.select.multipleselect\" v-model=\"action.select.value\" :value=\"action.select.value\" :placeholder=\"action.select.placeholder\" class=\"botui-actions-text-searchselect\" :label=\"action.select.label\" :options=\"action.select.options\"></v-select><v-select v-else-if=\"action.select.searchselect && action.select.multipleselect\" multiple v-model=\"action.select.value\" :value=\"action.select.value\" :placeholder=\"action.select.placeholder\" class=\"botui-actions-text-searchselect\" :label=\"action.select.label\" :options=\"action.select.options\"></v-select> <select v-else v-model=\"action.select.value\" class=\"botui-actions-text-select\" :placeholder=\"action.select.placeholder\" :size=\"action.select.size\" :class=\"action.select.cssClass\" required v-focus><option v-for=\"option in action.select.options\" :class=\"action.select.optionClass\" v-bind:value=\"option.value\" :disabled=\"(option.value == \'\')?true:false\" :selected=\"(action.select.value == option.value)?\'selected\':\'\'\"> {{ option.text }}</option></select> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.select.button, \'botui-actions-select-submit\': !action.select.button}\"><i v-if=\"action.select.button && action.select.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.select.button.icon\"></i> <span>{{(action.select.button && action.select.button.label) || \'Ok\'}}</span></button></form><div v-if=\"action.type == \'button\'\" class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\" autofocus><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div><form v-if=\"action.type == \'buttontext\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\"action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button><div class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\" autofocus><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div></form></div></transition></div></div>', // replaced by HTML template during build. see Gulpfile.js
      
      template: `<div class="botui botui-container" v-botui-container>
      <div class="botui-messages-container">
          <div v-for="msg in messages" class="botui-message" :class="msg.cssClass" v-botui-scroll>
              <transition name="slide-fade">
                  <div v-if="msg.visible" :class="[{human: msg.human, 'botui-message-content': true}, msg.type]">
                      <span v-if="msg.type == 'text'" v-text="msg.content" v-botui-markdown></span>
                      <iframe v-if="msg.type == 'embed'" :src="msg.content" frameborder="0" allowfullscreen></iframe>
                  </div>
              </transition>
              <div v-if="msg.loading" class="botui-message-content loading">
                  <i class="dot"></i>
                  <i class="dot"></i>
                  <i class="dot"></i>
              </div>
          </div>
      </div>
      <div class="botui-actions-container">
          <transition name="slide-fade">
              <div v-if="action.show" v-botui-scroll>
                  <form v-if="action.type == 'text'" class="botui-actions-text" @submit.prevent="handle_action_text()" :class="action.cssClass">
                      <i v-if="action.text.icon" class="botui-icon botui-action-text-icon fa" :class=\
                          "'fa-' + action.text.icon"></i>
                      <input type="text" ref="input" :type="action.text.sub_type" v-model=\ "action.text.value" class="botui-actions-text-input"
                          :placeholder="action.text.placeholder" :size=\ "action.text.size" :value=" action.text.value" :class="action.text.cssClass"
                          required v-focus/>
                      <button type="submit" :class="{'botui-actions-buttons-button': !!action.text.button, 'botui-actions-text-submit': !action.text.button}"></button>
                  </form>
                  <form v-if="action.type == 'select'" class="botui-actions-select" @submit.prevent=\
                      "handle_action_select()" :class="action.cssClass">
                      <i v-if="action.select.icon" class="botui-icon botui-action-select-icon fa" :class="'fa-' + action.select.icon"></i>
                      <v-select v-if="action.select.searchselect && !action.select.multipleselect" v-model="action.select.value" :value="action.select.value" :placeholder="action.select.placeholder" class=\
                          "botui-actions-text-searchselect" :label="action.select.label" :options="action.select.options"></v-select>
                      <v-select v-else-if="action.select.searchselect && action.select.multipleselect" multiple
                          v-model="action.select.value" :value="action.select.value" :placeholder="action.select.placeholder"
                          class="botui-actions-text-searchselect" :label="action.select.label" :options="action.select.options"></v-select>
                      <v-select v-else-if="action.select.searchselect && action.select.multipleselect" multiple
                          v-model="action.select.value" :value="action.select.value" :placeholder="action.select.placeholder"
                          class="botui-actions-text-searchselect" :label="action.select.label" :options="action.select.options"></v-select>
                      <select v-else v-model="action.select.value" class="botui-actions-text-select" :placeholder="action.select.placeholder" :size="action.select.size" :class="action.select.cssClass" required v-focus>
                          <option v-for="option in action.select.options" :class="action.select.optionClass" v-bind:value="option.value" :disabled="(option.value == '')?true:false" :selected="(action.select.value == option.value)?'selected':''"> {{ option.text }}</option>
                      </select>
                      <button type="submit" :class=\
                          "{'botui-actions-buttons-button': !!action.select.button, 'botui-actions-select-submit': !action.select.button}">
                          <i v-if="action.select.button && action.select.button.icon" class=\
                              "botui-icon botui-action-button-icon fa" :class="'fa-' + action.select.button.icon"></i>
                          <span>{{(action.select.button && action.select.button.label) || 'Ok'}}</span>
                      </button>
                  </form>
                  <div v-if="action.type == 'form'">
                    <form class="botui-actions-form" @submit.prevent="handle_action_form('validate')" :class="action.cssClass">                      
                        <div class="buttons">
                          <input type="checkbox" id='c1' class='chk-btn' v-model="action.form.options[0].checked" />
                          <label class="botui-actions-buttons-button multiselect" for='c1'>{{action.form.options[0].text}}</label>
                          <input type="checkbox" id='c2' class='chk-btn' v-model="action.form.options[1].checked"/>
                          <label class="botui-actions-buttons-button multiselect" for='c2'>{{action.form.options[1].text}}</label>
                          <input type="checkbox" id='c3' class='chk-btn' v-model="action.form.options[2].checked"/>
                          <label class="botui-actions-buttons-button multiselect" for='c3'>{{action.form.options[2].text}}</label>
                        </div>
                        <div class="buttons">
                        <button type="submit" class="botui-actions-buttons-button s0">
                          <span>VALIDATE</span>
                        </button>
                        <button type="button" class="botui-actions-buttons-button s2" @click="handle_action_subMenu('open')">
                          <span>...</span>
                        </button>
                        <div>
                    </form>
                    <div class="subMenu">
                        <button v-if="action.form.readmore" type="button" class="botui-actions-buttons-button subMenu" @click="handle_action_form('readmore')">read more</button>
                        <button v-if="action.form.differ" type="button" class="botui-actions-buttons-button subMenu" @click="handle_action_form('differ')">differ this question</button>
                        <button v-if="action.form.transfer" type="button" class="botui-actions-buttons-button subMenu" @click="handle_action_form('transfer')">transfer this question</button>
                        <button v-if="action.form.assistance" type="button" class="botui-actions-buttons-button subMenu" @click="handle_action_form('assistance')">💁assistance</button>
                        <button type="button" class="botui-actions-buttons-button subMenu s2" @click="handle_action_subMenu('close')">✕</button>
                    </div>
                  </div>
                  <div v-if="action.type == 'form1'">
                    <form class="botui-actions-form" @submit.prevent="handle_action_form('validate')" :class="action.cssClass">                      
                        <div class="buttons">
                          <input type="checkbox" id='c1' class='chk-btn' v-model="action.form1.options[0].checked" />
                          <label class="botui-actions-buttons-button multiselect" for='c1'>{{action.form.options[0].text}}</label>
                          <input type="checkbox" id='c2' class='chk-btn' v-model="action.form.options[1].checked"/>
                          <label class="botui-actions-buttons-button multiselect" for='c2'>{{action.form.options[1].text}}</label>
                          <input type="checkbox" id='c3' class='chk-btn' v-model="action.form.options[2].checked"/>
                          <label class="botui-actions-buttons-button multiselect" for='c3'>{{action.form.options[2].text}}</label>
                        </div>
                        <div class="buttons">
                        <button type="submit" class="botui-actions-buttons-button s0">
                          <span>VALIDATE</span>
                        </button>
                        <button type="button" class="botui-actions-buttons-button s2" @click="handle_action_subMenu('open')">
                          <span>...</span>
                        </button>
                        <div>
                    </form>
                    <div class="subMenu">
                        <button v-if="action.form.readmore" type="button" class="botui-actions-buttons-button subMenu" @click="handle_action_form('readmore')">read more</button>
                        <button v-if="action.form.differ" type="button" class="botui-actions-buttons-button subMenu" @click="handle_action_form('differ')">differ this question</button>
                        <button v-if="action.form.transfer" type="button" class="botui-actions-buttons-button subMenu" @click="handle_action_form('transfer')">transfer this question</button>
                        <button v-if="action.form.assistance" type="button" class="botui-actions-buttons-button subMenu" @click="handle_action_form('assistance')">💁assistance</button>
                        <button type="button" class="botui-actions-buttons-button subMenu s2" @click="handle_action_subMenu('close')">✕</button>
                    </div>
                  </div>
                  <div v-if="action.type == 'button'" class="botui-actions-buttons" :class="action.cssClass">
                      <button type="button" :class="button.cssClass" class="botui-actions-buttons-button" v-for=\
                          "button in action.button.buttons" @click="handle_action_button(button)" autofocus>
                          <i v-if="button.icon" class="botui-icon botui-action-button-icon fa" :class=\ "'fa-' + button.icon"></i> {{button.text}}</button>
                  </div>
                  <div v-if="action.type == 'photo'" class="botui-actions-buttons" :class="action.cssClass">
                      <button type="button" :class="button.cssClass" class="botui-actions-buttons-button" 
                        v-for="button in action.button.buttons" @click="handle_action_photo(button)" autofocus>{{button.text}}</button>
                  </div>
                  <form v-if="action.type == 'buttontext'" class="botui-actions-text" @submit.prevent=\
                      "handle_action_text()" :class="action.cssClass">
                      <i v-if="action.text.icon" class="botui-icon botui-action-text-icon fa" :class=\
                          "'fa-' + action.text.icon"></i>
                      <input type="text" ref="input" :type="action.text.sub_type" v-model=\ "action.text.value" class="botui-actions-text-input"
                          :placeholder="action.text.placeholder" :size=\ "action.text.size" :value="action.text.value" :class="action.text.cssClass"
                          required v-focus/>
                      <button type="submit" :class=\
                          "{'botui-actions-buttons-button': !!action.text.button, 'botui-actions-text-submit': !action.text.button}">
                          <i v-if="action.text.button && action.text.button.icon" class=\
                              "botui-icon botui-action-button-icon fa" :class="'fa-' + action.text.button.icon"></i>
                          <span>{{(action.text.button && action.text.button.label) || 'Go'}}</span>
                      </button>
                      <div class="botui-actions-buttons" :class="action.cssClass">
                          <button type="button" :class="button.cssClass" class="botui-actions-buttons-button" v-for=\
                              "button in action.button.buttons" @click="handle_action_button(button)" autofocus>
                              <i v-if="button.icon" class="botui-icon botui-action-button-icon fa" :class=\
                                  "'fa-' + button.icon"></i> {{button.text}}</button>
                      </div>
                  </form>
              </div>
          </transition>
      </div>
  </div>`,
      data: function () {
        return {
          action: {
            text: {
              size: 30,
              placeholder: 'Write here ..'
            },
            button: {},
            show: false,
            type: 'text',
            autoHide: true,
            addMessage: true
          },
          messages: []
        };
      },
      computed: {
        isMobile: function () {
          return root.innerWidth && root.innerWidth <= 768;
        }
      },
    	methods: {
    		handle_action_button: function (button) {
                    
          // hooks
          if(lvmh.handle_action_button(button)){            
            _handleAction(button.text);    
          }

          var defaultActionObj = {
            type: 'button',
            text: button.text,
            value: button.value
          };

          for (var eachProperty in button) {
            if (button.hasOwnProperty(eachProperty)) {
              if (eachProperty !== 'type' && eachProperty !== 'text' && eachProperty !== 'value') {
                defaultActionObj[eachProperty] = button[eachProperty];
              }
            }
          }

          _actionResolve(defaultActionObj);
        },
        handle_action_photo: function (button) {
          var defaultActionObj = {
            type: 'photo',
            text: button.text,
            value: button.value
          };

          if(button.value=="yes"){
            document.getElementById("myFile").click();
            this._data.action.addMessage = false;
            
            document.getElementById("myFile").onchange = function(){
                let file = this.files[0];
                //let url = window.URL.createObjectURL(file);
                uploadFile(file, function(url){
                  defaultActionObj.url = url;
                  addImage({url: url, cssClass: "human"}).then(()=>{
                    _handleAction(button.text);
                    _actionResolve(defaultActionObj);
                  });
                });
            };
          }
          else{
            _handleAction(button.text);
            _actionResolve(defaultActionObj);
          }          
    		},
    		handle_action_text: function () {
          if(!this.action.text.value) return;
          // hooks
          if(lvmh.handle_action_text(this.action)){                       
            _handleAction(this.action.text.value); 
          }
          
    			_actionResolve({
            type: 'text',
            value: this.action.text.value
          });
    			this.action.text.value = '';
    		},
        handle_action_select: function () {
          if(this.action.select.searchselect && !this.action.select.multipleselect) {
            if(!this.action.select.value.value) return; 
            _handleAction(this.action.select.value[this.action.select.label]);
            _actionResolve({
              type: 'text',
              value: this.action.select.value.value,
              text: this.action.select.value.text,
              obj: this.action.select.value
            });
          } 
          if(this.action.select.searchselect && this.action.select.multipleselect) {
            if(!this.action.select.value) return; 
            var values = new Array();
            var labels = new Array();
            for (var i = 0; i < this.action.select.value.length; i++) {
              values.push(this.action.select.value[i].value);
              labels.push(this.action.select.value[i][this.action.select.label]);
            }

            // hooks
            if(lvmh.handle_action_select(this.action)){
              if(labels && labels.length==0)
                labels = ["..."];
              _handleAction(labels.join(', '));
            }
            
            _actionResolve({
              type: 'text',
              value: values.join(', '),
              text: labels.join(', '),
              obj: this.action.select.value
            });
          }
          else {
            if(!this.action.select.value) return;
            for (var i = 0; i < this.action.select.options.length; i++) { // Find select title
              if (this.action.select.options[i].value == this.action.select.value) {
                _handleAction(this.action.select.options[i].text);
                _actionResolve({
                  type: 'text',
                  value: this.action.select.value,
                  text: this.action.select.options[i].text
                });
              }
            }
          }
        },
        handle_action_form: function (button) {
          if(!button) return;
          let texts = [];
          for (var i = 0; i < this.action.form.options.length; i++) { // Find select title
            if (this.action.form.options[i].checked) 
              texts.push(this.action.form.options[i].text);
          }
          let msg = "...";
          if(texts.length>0)
            msg = texts.join(",");
          _handleAction(msg);

          _actionResolve({
            type: 'form',
            value: "hhi",
            button: button,
            text: msg,
          });
           
        },
        handle_action_subMenu: function (e) {
          // hide the actions
          if(e=="open"){
            $(".botui-actions-form").fadeOut(()=>{          
              $(".subMenu").show().slideDown();
            });
          }
          else{
            $(".subMenu").fadeOut(()=>{          
              $(".botui-actions-form").show().slideDown();
            });
          }
          
        }
    	}
    };

    root.Vue.directive('botui-markdown', function (el, binding) {
      if(binding.value == 'false') return; // v-botui-markdown="false"
      el.innerHTML = _parseMarkDown(el.textContent);
    });

    root.Vue.directive('botui-scroll', {
      inserted: function (el) {
        _container.scrollTop = _container.scrollHeight;
      }
    });

    root.Vue.directive('focus', {
      inserted: function (el) {
        el.focus();
      }
    });

    root.Vue.directive('botui-container', {
      inserted: function (el) {
        _container = el;
      }
    });

    _botApp = new root.Vue({
      components: {
        'bot-ui': _botuiComponent
      }
    }).$mount('#' + id);

    var _instance = _botApp.$children[0]; // to access the component's data

    function _addMessage(_msg) {

      if(!_msg.loading && !_msg.content) {
        throw Error('BotUI: "content" is required in a non-loading message object.');
      }

      _msg.type = _msg.type || 'text';
      _msg.visible = (_msg.delay || _msg.loading) ? false : true;

      // lvmh-bot: hooks
      
      var _index = _instance.messages.push(_msg) - 1;

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if(_msg.delay) {
            _msg.visible = true;

            if(_msg.loading) {
              _msg.loading = false;
            }
          }
          resolve(_index);
        }, _msg.delay || 0);
      });
    }

    function _checkOpts(_opts) {
      if(typeof _opts === 'string') {
        _opts = {
          content: _opts
        };
      }
      return _opts || {};
    }

    _interface.message =  {
      add: function (addOpts) {
        return _addMessage( _checkOpts(addOpts) );
      },
      bot: function (addOpts) {
        addOpts = _checkOpts(addOpts);
        return _addMessage(addOpts);
      },
      human: function (addOpts) {
        addOpts = _checkOpts(addOpts);
        addOpts.human = true;
        return _addMessage(addOpts);
      },
      get: function (index) {
        return Promise.resolve(_instance.messages[index]);
      },
      remove: function (index) {        
        _instance.messages.splice(index, 1);
        return Promise.resolve();
      },
      update: function (index, msg) { // only content can be updated, not the message type.
        var _msg = _instance.messages[index];
        _msg.content = msg.content;
        _msg.visible = !msg.loading;
        _msg.loading = !!msg.loading;
        return Promise.resolve(msg.content);
      },
      removeAll: function () {
        _instance.messages.splice(0, _instance.messages.length);
        return Promise.resolve();
      }
    };

    function mergeAtoB(objA, objB) {
      for (var prop in objA) {
        if (!objB.hasOwnProperty(prop)) {
          objB[prop] = objA[prop];
        }
      }
    }

    function _checkAction(_opts) {
      if(!_opts.action && !_opts.actionButton  && !_opts.actionText) {
        throw Error('BotUI: "action" property is required.');
      }
    }

    function _showActions(_opts) {

      _checkAction(_opts);

      mergeAtoB({
        type: 'text',
        cssClass: '',
        autoHide: true,
        addMessage: true
      }, _opts);

      _instance.action.type = _opts.type;
      _instance.action.cssClass = _opts.cssClass;
      _instance.action.autoHide = _opts.autoHide;
      _instance.action.addMessage = _opts.addMessage;

      return new Promise(function(resolve, reject) {
        _actionResolve = resolve; // resolved when action is performed, i.e: button clicked, text submitted, etc.
        setTimeout(function () {
          _instance.action.show = true;
        }, _opts.delay || 0);
      });
    };

    _interface.action = {
      show: _showActions,
      hide: function () {
        _instance.action.show = false;
        return Promise.resolve();
      },
      text: function (_opts) {
        _checkAction(_opts);
        _instance.action.text = _opts.action;
        return _showActions(_opts);
      },
      button: function (_opts) {
        _checkAction(_opts);
        _opts.type = 'button';
        _instance.action.button.buttons = _opts.action;
        return _showActions(_opts);
      },
      photo: function (_opts) {
        _checkAction(_opts);
        _opts.type = 'photo';
        _instance.action.button.buttons = _opts.action;
        _instance.action.addMessage = false;
        return _showActions(_opts);
      },
      select: function (_opts) {
        _checkAction(_opts);
        _opts.type = 'select';
        _opts.action.label = _opts.action.label || 'text';
        _opts.action.value = _opts.action.value || '';
        _opts.action.searchselect = _opts.action.searchselect || _options.searchselect;
        _opts.action.multipleselect = _opts.action.multipleselect || false;
        if (_opts.action.searchselect && typeof(_opts.action.value) == 'string') {
          if (!_opts.action.multipleselect) {
            for (var i = 0; i < _opts.action.options.length; i++) { // Find object
              if (_opts.action.options[i].value == _opts.action.value) {
                _opts.action.value = _opts.action.options[i]
              }
            }
          }
          else {
            var vals = _opts.action.value.split(',');
            _opts.action.value = new Array();
            for (var i = 0; i < _opts.action.options.length; i++) { // Find object
              for (var j = 0; j < vals.length; j++) { // Search values
                if (_opts.action.options[i].value == vals[j]) {
                  _opts.action.value.push(_opts.action.options[i]);
                }
              }
            }
          }
        }
        if (!_opts.action.searchselect) { _opts.action.options.unshift({value:'',text : _opts.action.placeholder}); }
        _instance.action.button = _opts.action.button;
        _instance.action.select = _opts.action;
        return _showActions(_opts);
      },
      buttontext: function (_opts) {
        _checkAction(_opts);
        _opts.type = 'buttontext';
        _instance.action.button.buttons = _opts.actionButton;
        _instance.action.text = _opts.actionText;
        return _showActions(_opts);
      },
      form: function(_opts){
        _checkAction(_opts);
        _opts.type = 'form';
        _opts.action.label = _opts.action.label || 'text';
        _opts.action.value = _opts.action.value || '';
        
        _instance.action.form = _opts.action;
        return _showActions(_opts);
      }
    };

    if(_options.fontawesome) {
      loadScript(_fontAwesome);
    }

    if(_options.searchselect) {
      loadScript(_searchselect, function() {
        Vue.component('v-select', VueSelect.VueSelect);      
      });
    }

    if(_options.debug) {
      _interface._botApp = _botApp; // current Vue instance
    }

    return _interface;
  });

  return BotUI;

}));
