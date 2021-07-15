import React, { Component } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import Agenda from './src/Agenda';

export default class App extends Component {


  

	render() {
		return(
			<Agenda />
		)
	}

}

const styles = StyleSheet.create({
	
})