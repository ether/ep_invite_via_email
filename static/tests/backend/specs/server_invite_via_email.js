'use strict';

const assert = require('assert').strict;
const {getFromAddress} = require('../../../../server_invite_via_email');

describe(__filename, function () {
  it('uses the default sender when no setting is configured', function (done) {
    assert.equal(getFromAddress(), 'Etherpad <email-invite@etherpad.org>');
    done();
  });

  it('uses the configured sender when provided in settings', function (done) {
    assert.equal(
        getFromAddress({from: 'Etherpad Team <noreply@example.com>'}),
        'Etherpad Team <noreply@example.com>',
    );
    done();
  });
});
