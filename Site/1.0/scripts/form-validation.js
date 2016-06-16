// Popovers
$('#input-name').popover({
	content: 'Please enter your name.',
	trigger: 'manual',
	placement: 'top'
});
$('#input-email').popover({
	content: 'Please enter a valid email address.',
	trigger: 'manual',
	placement: 'top'
});
$('#input-message').popover({
	content: 'Please enter your message.',
	trigger: 'manual',
	placement: 'top'
});


// Validation
function validation() {
	var contactname=document.enq.name.value;
	var name_exp=/^[A-Za-z\s]+$/;
	
	if (contactname=='') {
	
		$('#contact-name').addClass('has-warning');
		$('#input-name').popover('show')
		document.enq.name.focus();
		return false;
		
	} else if (!contactname.match(name_exp)) {
	
		$('#contact-name').addClass('has-error');
		$('#input-name').popover('show')
		document.enq.name.focus();
		return false;
	} else {
		$('#contact-name').addClass('has-success');
		$('#input-name').popover('hide')
	}
	
	var email=document.enq.email.value;
	
	var email_exp=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	
	if (email=='') {
	
		$('#contact-email').addClass('has-warning');
		$('#input-email').popover('show')
		document.enq.email.focus();
		return false;
		
	} else if (!email.match(email_exp)) {
	
		$('#contact-email').addClass('has-error');
		$('#input-email').popover('show')
		document.enq.email.focus();
		return false;
		
	} else {
		$('#contact-email').addClass('has-success');
		$('#input-email').popover('hide')
	}
	
	var message=document.enq.message.value;
	
	if (message=='') {
		$('#contact-message').addClass('has-warning');
		$('#input-message').popover('show')
		document.enq.message.focus();
		return false;
	} else {
		$('#contact-message').addClass('has-success');
		$('#input-message').popover('hide')
	}
	
	return true;
}