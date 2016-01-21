var util = require('./util');

module.exports = {
  answersCreate: function (params, data) {
    return util.apiPost('/rooms/' + params.roomId + '/answers', data);
  },

  initialValueIndex: function (params) {
    return util.apiGet('/rooms/' + params.roomId + '/initialValue');
  },

  getRanking: function (userId, roomId, resultTime, rankCount, rankSort) {
	   return util.apiGet('/ranks?userId=' + userId + '&roomId=' + roomId + '&resultTime=' + resultTime + '&rankCount=' + rankCount + '&rankSort=' + rankSort);
  },

  sessionCreate: function (params) {
    return util.apiPost('/session', params);
  },

  roomsCreate: function (params) {
    return util.apiPost('/rooms', params);
  },

  ranksIndex: function (params) {
    return util.apiGet('/ranks', params);
  }
};
