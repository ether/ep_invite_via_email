'use strict';

exports.postAceInit = (hookName, args, cb) => {
  // add email invite to then embed div
  $('#embedcode').append(`</div><br><br>
      <a>Invite someone to this pad:</a>
      <br><br>
      <div id="emailform">
        Your name: <br>
        <input id="youremailnameinput" style="height:24px;width:375px;" type="text" value="">
        <br>
        The email address of the person you want to invite:
        <br>
        <input style="height:24px;width:375px;" id="emailrcptinput" type="text" value="">
        <br><br>
        <button class="sendEmailButton" style="height:40px;width:200px;">Send invitation</button>
        </div>`
  );

  $('.sendEmailButton').click(() => {
    const padurl = $('#linkinput').val();
    const name = $('#youremailnameinput').val();
    const email = $('#emailrcptinput').val();
    const data = `name=${name}&email=${email}&padurl=${padurl}`;
    const url = '/server_invite_via_email';
    $.ajax({
      type: 'GET',
      url,
      data,
    }).done(
        (msg) => {
        }
    );
    alert('Invitation sent...');
    $('#embed').fadeOut();
  });
};
