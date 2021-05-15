  $(document).ready(function() {
      $('#email_template').summernote({
          height: 350
      });
  });

  const Send_Email = () => {
      let formData = new FormData();
      const to = $('#emailto').val();
      const cc = $('#emailCC').val();
      const bcc = $('#emailbcc').val();
      const subject = $('#subject').val();
      const body = $('#email_template').summernote('code');
      const attachmentlist = $('#email_attachments').get(0).dropzone;
      const files = attachmentlist.files;
      for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
      }

      const emailobject = {
          emailto: to,
          emailcc: cc,
          emailbcc: bcc,
          subject: subject,
          body: body

      }
      formData.append('emailobject', JSON.stringify(emailobject));
      $.ajax({

          url: '/sendemail',
          method: 'POST',
          type: 'POST',
          datatype: 'JSON',
          Accept: "application/json",
          contentType: 'application/json',
          processData: false,
          contentType: false,
          data: formData,


          success: (response) => {
              console.log(response);
              window.alert("Email sent successfully!!");
              location.reload();
          },
          error: (err) => {
              console.log(err.message);
              console.log("error");
          }
      })
  }