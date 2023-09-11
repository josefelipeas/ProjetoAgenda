import validator from "validator";

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        const validaCampos = this.validateFields(e);
        if (!validaCampos) {
            this.form.submit();
        }
    }

    validateFields(e) {
        let error = false;
        const element = e.target;
        const emailInput = element.querySelector('input[name="email"]');
        const nomeInput = element.querySelector('input[name="nome"]');
        const telefoneInput = element.querySelector('input[name="telefone"]');

        for(let errorText of this.form.querySelectorAll('.text-danger')) {
            errorText.remove();
        }

        if(!nomeInput.value) {
            this.showError(nomeInput, 'Campo Nome não pode estar vazio.');
            error = true;
        }

        if(emailInput.value && !validator.isEmail(emailInput.value)) {
            this.showError(emailInput, 'E-mail inválido.');
            error = true;
        }

        if(!emailInput.value && !telefoneInput.value) {
            this.showError(emailInput, 'Favor informe um telefone ou um e-mail válido.');
            this.showError(telefoneInput, 'Favor informe um telefone ou um e-mail válido.');
            error = true;
        }

        //if(!error) element.submit();
        return error;
    }

    showError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('text-danger');
        campo.insertAdjacentElement('afterend', div);
    }
}