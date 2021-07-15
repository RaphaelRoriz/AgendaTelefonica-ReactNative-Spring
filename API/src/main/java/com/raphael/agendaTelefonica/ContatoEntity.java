package com.raphael.agendaTelefonica;

import javax.persistence.*;

@Entity
@Table(name = "contatos")
public class ContatoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "numero" )
    private String numero;

    public ContatoEntity() {

    }

    public ContatoEntity(ContatoDto contatoDto) {
        this.setNome(contatoDto.getNome());
        this.setNumero(contatoDto.getNumero());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public void atualizarContato(ContatoDto contato) {
        if(contato.getNome() != null && !contato.getNome().isEmpty()) {
            this.setNome(contato.getNome());
        }
        if(contato.getNumero() != null && !contato.getNumero().isEmpty()) {
            this.setNumero(contato.getNumero());
        }
    }
}
