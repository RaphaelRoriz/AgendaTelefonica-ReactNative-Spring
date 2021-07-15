import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableWithoutFeedback, FlatList, StyleSheet } from 'react-native'

const initialState = {
    id: 0,
    nome: "Nome",
    numero: "Número"
}

export default props => {

    const [contatos, updateContatos] = useState([])
    const [contato, updateContato] = useState({ ...initialState })
    const [refreshFlatlist, setRefreshFlatList] = useState(false)
    const [updatingContato, setUpdatingContato] = useState(false)
    const [updatingContatoId, setUpdatingContatoId] = useState('')

    useEffect(() => {
        atualizarContatos();
    }, [])

    const atualizarContatos = () => {
        getContatosFromApi()
    }

    const getContatosFromApi = async () => {
        try{
            let response = await fetch('localhost/contatos')
            let json = await response.json()
            updateContatos(json)
        }
        catch(error){
            console.error(error)
        }
    }


    const handleChangeNome = novoNome => {
        updateContato({
            ...contato,
            nome: novoNome,
        })
    }

    const handleChangeNumero = novoNumero => {
        const trimNumero = novoNumero.replace(/[^0-9]/g, "")
        updateContato({
            ...contato,
            numero: trimNumero,
        })
    }

    const handleAdd = () => {
        if (contato.nome.trim()) {
            contato.id = contatos.length
            
            postContatosToApi().then(result=>{atualizarContatos()})
            
            updateContato({ ...initialState })

            this.nomeInput.clear()
            this.numeroInput.clear()
            
        }
    }

    const postContatosToApi = async () => {
        let response = await fetch('localhost/contatos/salvar',{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: contato.nome,
                numero: contato.numero
            })
        })
    }

    function handleDelete(itemId) {
        
        deleteContatosOnApi(itemId).then(res => atualizarContatos())

        updateContatos[contatos]

        setRefreshFlatList(!refreshFlatlist)
    }

    const deleteContatosOnApi = async id => {
        let response = await fetch(`localhost/contatos/${id}`,{
            method: 'DELETE',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    function setUpdateContato(item) {
        setUpdatingContato(true)
        updateContato({ ...item })
        setUpdatingContatoId(item.id)
    }

    function handleUpdate() {

        contato.id = updatingContatoId
        
        updateContatosOnApi(contato.id).then(res => atualizarContatos())

        updateContato({ ...initialState })    

        setUpdatingContatoId('')

        setUpdatingContato(false)
    }

    const updateContatosOnApi = async id => {
        let response = await fetch(`localhost/contatos/${id}`,{
            method: 'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: contato.nome,
                numero: contato.numero
            })
        })
    }


    const handleRenderContato = ({ item }) =>

        <View style={{ flex: 1 }}>
            <View style={styles.itemContainer}>

                <View style={styles.itemTexts}>
                    <Text>Nome: {item.nome}</Text>
                    <Text>Número: {item.numero}</Text>
                    <Text>ID: {item.id}</Text>
                </View>

                <View style={styles.itemButtons}>
                    <TouchableWithoutFeedback onPress={() => setUpdateContato(item)}>
                        <View style={[styles.itemButton, { backgroundColor: 'blue' }]}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleDelete(item.id)}>
                        <View style={[styles.itemButton, { backgroundColor: 'red' }]}>
                            <Text style={styles.buttonText}>Excl</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>


    return (
        <SafeAreaView>

            <View style={styles.container}>

                <Text style={styles.title}>
                    Agenda Telefônica
                </Text>

                <View style={styles.form}>

                    <TextInput
                        style={styles.field}
                        value={updatingContato ? contato.nome : null}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        onChangeText={handleChangeNome}
                        ref={input => { this.nomeInput = input }}
                        placeholder="Nome"
                    >

                    </TextInput>

                    <TextInput
                        style={styles.field}
                        value={updatingContato ? contato.numero : null}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        onChangeText={handleChangeNumero}
                        ref={input => { this.numeroInput = input }}
                        keyboardType='numeric'
                        placeholder="Número"
                    >
                    </TextInput>

                    {!updatingContato && (
                        <TouchableWithoutFeedback onPress={handleAdd}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Adicionar</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}

                    {updatingContato && (
                        <TouchableWithoutFeedback onPress={handleUpdate}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}

                </View>

                <FlatList data={contatos}
                    keyExtractor={item => item.id}
                    renderItem={handleRenderContato}
                    extraData={refreshFlatlist}
                />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20
    },
    field: {
        borderWidth: 1,
        padding: 10,
        fontSize: 15,
        color: '#333',
        borderRadius: 5,
        flex: 1,
        marginRight: 10
    },
    button: {
        backgroundColor: '#00cc99',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fdfdfd'
    },
    itemContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#dcdcdc',
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 3,
    },
    itemTexts: {
        flex: 5,
        flexDirection: 'column'
    },
    itemButtons: {
        flex: 2,
        flexDirection: 'row'
    },
    itemButton: {
        padding: 7,
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 10
    },
    form: {
        flexDirection: 'row'
    },

})