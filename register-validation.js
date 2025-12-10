document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        resetValidation();
        
        const errors = [];
        
        if (!validateTextField('firstName', 'First name is required')) {
            errors.push('Please enter your first name');
        }
        
        if (!validateTextField('lastName', 'Last name is required')) {
            errors.push('Please enter your last name');
        }
        
        if (!validateDateField('dob')) {
            errors.push('Please enter a valid date of birth (minimum age 5 years)');
        }
        
        if (!validateSelectField('gender', 'Please select gender')) {
            errors.push('Please select your gender');
        }
        
        if (!validateEmailField('email')) {
            errors.push('Please enter a valid email address');
        }
        
        if (!validatePhoneField('phone', 'Phone number is required')) {
            errors.push('Please enter a valid Ethiopian phone number (+251...)');
        }
        
        if (!validateTextArea('address', 'Address is required')) {
            errors.push('Please enter your address');
        }
        
        if (!validateSelectField('grade', 'Please select grade level')) {
            errors.push('Please select your grade level');
        }
        
        if (!validateSelectField('stream', 'Please select academic stream')) {
            errors.push('Please select your academic stream');
        }
        
        if (!validateTextField('fatherName', "Father's name is required")) {
            errors.push("Please enter your father's name");
        }
        
        if (!validateTextField('motherName', "Mother's name is required")) {
            errors.push("Please enter your mother's name");
        }
        
        if (!validateTextField('emergencyContact', 'Emergency contact is required')) {
            errors.push('Please enter emergency contact name');
        }
        
        if (!validatePhoneField('emergencyPhone', 'Emergency phone is required')) {
            errors.push('Please enter a valid emergency phone number');
        }
        
        if (!validateTermsCheckbox()) {
            errors.push('You must agree to the terms and conditions');
        }
        
        if (errors.length === 0) {
           
            alert('Registration submitted successfully! We will contact you soon.');
            this.reset();
        } else {
            
            showErrorMessages(errors);
            
      
            showFirstError();
        }
    });


    
    function resetValidation() {
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        
        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.remove();
        });
        
        const existingErrorBox = document.getElementById('errorSummary');
        if (existingErrorBox) {
            existingErrorBox.remove();
        }
        
        const termsLabel = document.querySelector('#terms + label');
        if (termsLabel) {
            termsLabel.classList.remove('text-danger', 'fw-bold');
        }
    }
    
    function showErrorMessages(errors) {
        const errorBox = document.createElement('div');
        errorBox.id = 'errorSummary';
        errorBox.className = 'alert alert-danger mb-4';
        errorBox.setAttribute('role', 'alert');
        
        const heading = document.createElement('h4');
        heading.className = 'alert-heading h5';
        heading.textContent = 'Please fix the following errors:';
        errorBox.appendChild(heading);
        
        const errorList = document.createElement('ul');
        errorList.className = 'mb-0 ps-3';
        
        errors.forEach(error => {
            const item = document.createElement('li');
            item.textContent = error;
            errorList.appendChild(item);
        });
        
        errorBox.appendChild(errorList);
        
        const formHeader = document.querySelector('.card-header');
        formHeader.parentNode.insertBefore(errorBox, formHeader.nextSibling);
    }
    
    function validateTextField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(field, errorMessage);
            return false;
        }
        return true;
    }
    
    function validateTextArea(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(field, errorMessage);
            return false;
        }
        return true;
    }
    
    function validateEmailField(fieldId) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            showFieldError(field, 'Email address is required');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function validatePhoneField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        const phoneRegex = /^(?:\+251|0)[1-9]\d{8}$/;
        
        if (!value) {
            showFieldError(field, errorMessage);
            return false;
        }
        
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid Ethiopian phone number (e.g., +251911223344 or 0911223344)');
            return false;
        }
        
        return true;
    }
    
    function validateDateField(fieldId) {
        const field = document.getElementById(fieldId);
        const value = field.value;
        
        if (!value) {
            showFieldError(field, 'Date of birth is required');
            return false;
        }
        
        const dob = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age < 5) {
            showFieldError(field, 'Student must be at least 5 years old');
            return false;
        }
        
        return true;
    }
    
    function validateSelectField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        
        if (!field.value) {
            showFieldError(field, errorMessage);
            return false;
        }
        return true;
    }
    
    function validateTermsCheckbox() {
        const termsCheckbox = document.getElementById('terms');
        
        if (!termsCheckbox.checked) {
            const termsLabel = termsCheckbox.nextElementSibling;
            termsLabel.classList.add('text-danger', 'fw-bold');
            return false;
        }
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        if (field.tagName === 'SELECT') {
            field.closest('.form-floating').appendChild(errorDiv);
        } else {
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
    }
    
    function showFirstError() {
        const firstInvalidField = document.querySelector('.is-invalid');
        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            firstInvalidField.focus();
        }
    }
});