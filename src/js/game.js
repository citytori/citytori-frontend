var Game = function () {
  this._scenes = {};
  this._currentScene = null;
}, p = Game.prototype;

Object.defineProperties(p, {
  scenes: {
    get: function () {
      return this._scenes;
    },
    set: function (value) {
      for (var key in value) {
        this.addScene(key, value[key]);
      }
    }
  },
  currentScene: {
    get: function () {
      return this._currentScene;
    },
    set: function (value) {
      this._currentScene = value;
      window.currentScene = value;
    }
  }
});

p.addScene = function (id, scene) {
  this._scenes[id] = scene;
  scene._id = id;
}

p.transition = function (name, header, cb) {
  function fadeout (o, cb) {
  	o.animate({
  		"opacity": 0
  	}, 500, "easeInQuad", cb);
  }

  function fadein (o) {
  	o.css({
  		"opacity": 0
  	});
  	o.animate({
  		"opacity": 1
  	}, 500, "easeInQuad");
  }

  if (this.onBeforeTransition) this.onBeforeTransition();

  var scene = this.scenes[name];

	if (scene === undefined) {
		return console.warn('Not implemented scene:', name);
	}

	var $main = $('#js-main-container');
  var $description = $('#description');
  var that = this;

  scene._game = this;
  this.currentScene = scene;
  fadeout($description);
	fadeout($main, function () {
		$main.html(that.currentScene.view);
    that.currentScene.emit('shown');
		fadein($main);
    fadein($description);

		$("#description").text(header);

    if (that.onAfterTransition) that.onAfterTransition();

    if (cb) cb();
	});
}

module.exports = Game;
