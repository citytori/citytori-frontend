var util = require('./util');

module.exports = {
  answersCreate: function (params, data) {
    return util.apiPost('/rooms/' + params.roomId + '/answers', data);
  },

  initialValueIndex: function (params) {
    return util.apiGet('/rooms/' + params.roomId + '/initialValue');
  },

  // API �̎d�l�̂��߁CresultTime�̃p�����[�^�ŃX�R�A�A�^�b�N���̌��ʂ�AnswerNum�𑗂��Ă܂�
  getRanking: function (userId, roomId, resultTime, rankCount, rankSort, limitTime) {
	   return util.apiGet('/ranks?userId=' + userId + '&roomId=' + roomId + '&resultTime=' + resultTime + '&rankCount=' + rankCount + '&rankSort=' + rankSort + '&limitTime=' + limitTime);
  }
};
