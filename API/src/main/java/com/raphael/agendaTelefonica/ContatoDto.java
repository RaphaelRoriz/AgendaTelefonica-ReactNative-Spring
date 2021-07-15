package com.raphael.agendaTelefonica;

public class ContatoDto {

    private String nome;

    private String numero;

    public ContatoEntity transformaParaObjeto(){
        return new ContatoEntity(this);
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
