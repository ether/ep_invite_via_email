'use strict';

exports.postAceInit = (hookName, args, cb) => {
  // add email invite to then embed div
  $('#embedcode').append(`</div><br><br>
      <h2>Invite someone to this pad:</h2>
      <div id="emailform">
        Your name: <br>
        <input id="youremailnameinput" type="text" value="">
        <br>
        The email address of the person you want to invite:
        <br>
        <input id="emailrcptinput" type="text" value="">
        <br><br>
        <button class="sendEmailButton">Send invitation</button>
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
    $.gritter.add({
      title: 'Invitation sent...',
      text: `Email sent to ${email}`,
      sticky: false,
    });
    $('#embed').removeClass('popup-show');
  });
};
