import { AbstractControl } from "@angular/forms";

export class Validacoes{
  static ValidaCpf(controle: AbstractControl) {
    if (!controle.value) return null;
    const cpf = (controle.value) ? controle.value.toString() : null;

    let soma: number = 0;
    let resto: number;

    const regex = new RegExp('^[0-9]{11}$');

    if (
      !regex.test(cpf) ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return { cpfInvalido: true };
    else {
      for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) return { cpfInvalido: true };

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) return { cpfInvalido: true };
    }

    return null;
  }

  static MaiorQue18Anos(controle: AbstractControl) {
    const nascimento = controle.value;
    const [ano, mes, dia] = nascimento.split('-');
    const hoje = new Date();
    const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
    const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18; //18 anos em mili segundos...

    if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste)
      return null;

    return { menorDeIdade: true };
  }

  static Email(controle: AbstractControl) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(controle.value);

    return valid ? null : { 'invalidEmail': true };
  }
}
