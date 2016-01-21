module.exports = {
  callApi: function (method, path, data) {
    var hostname = CITYTORY_API_SERVER;
    var url = hostname + '/citytori/api' + path;

    return $.ajax({
      type: method,
      url: url,
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json'
    });
  },

  apiGet: function (path, data) {
    return this.callApi('get', path, data);
  },

  apiPost: function (path, data) {
    return this.callApi('post', path, data);
  },

  /**
   * クエリストリングの名前を指定して値を取得する (ref: http://stackoverflow.com/a/901144)
   * @param {String} name - 取得するキー
   * @returns {string} - 取得した値
   */
  getQueryParam: function (name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  },

  /** カタカナをひらがなに変換する
   * @param {String} src - カタカナ
   * @returns {String} - ひらがな
   */
  katakanaToHiragana: function (src) {
  	return src.replace(/[\u30a1-\u30f6]/g, function(match) {
  		var chr = match.charCodeAt(0) - 0x60;
  		return String.fromCharCode(chr);
  	});
  },

  inherits: function(childCtor, parentCtor) {
    Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
  }
};
