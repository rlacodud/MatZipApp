import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';

function SearchLocationScreen() {
	const [keyword, setKeyword] = useState<string>('');
	const {userLocation} = useUserLocation();
	useSearchLocation(keyword, userLocation);

	const handleChangeKeyword = (text: string) => {
		setKeyword(text);
	};

	return (
		<View style={styles.container}>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});

export default SearchLocationScreen;