package com.raphael.agendaTelefonica;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendaService {

    @Autowired
    ContatoRepository contatoRepository;

    public ContatoEntity salvarContato(ContatoDto contato) {
        ContatoEntity novoContato = contatoRepository.save(contato.transformaParaObjeto());
        return novoContato;
    }

    public List<ContatoEntity> getContatos() {
        return contatoRepository.findAll();
    }

    public Optional<ContatoEntity> atualizarContato(Long idContato, ContatoDto contato) {
        Optional<ContatoEntity> contatoOpt = contatoRepository.findById(idContato);

        if (contatoOpt.isPresent()) {
            contatoOpt.get().atualizarContato(contato);
            contatoRepository.save(contatoOpt.get());
        }

        return contatoOpt;

    }

    public boolean deletarContato(Long idContato) {
        try{
            contatoRepository.deleteById(idContato);
            return true;
        }catch (EmptyResultDataAccessException e){
            return false;
        }
    }
}
