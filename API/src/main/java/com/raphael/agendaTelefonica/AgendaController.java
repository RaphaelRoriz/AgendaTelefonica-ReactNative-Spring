package com.raphael.agendaTelefonica;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contatos")
public class AgendaController {

    @Autowired
    AgendaService agendaService;

    @PostMapping(value = "/salvar")
    public ResponseEntity<ContatoEntity> salvarContato(@Valid @RequestBody ContatoDto contato){
        try{
            ContatoEntity novoContato = agendaService.salvarContato(contato);
            return ResponseEntity.created(URI.create("/contatos" + novoContato.getId())).body(novoContato);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping()
    public ResponseEntity<List<ContatoEntity>> listarContatos(){
        return ResponseEntity.ok().body(agendaService.getContatos());
    }

    @PutMapping(value = "/{idContato}")
    public ResponseEntity atualizarContato(@RequestBody ContatoDto contato, @PathVariable("idContato") Long idContato){
        Optional<ContatoEntity> contatoAtualizado = agendaService.atualizarContato(idContato, contato);
        if (contatoAtualizado.isPresent()){
            return ResponseEntity.ok().body(contatoAtualizado.get());
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/{idContato}")
    public ResponseEntity deletarTarefa(@PathVariable("idContato") Long idContato){
        boolean contatoDeletado = agendaService.deletarContato(idContato);
        if (contatoDeletado){
            return ResponseEntity.noContent().build();
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


}
