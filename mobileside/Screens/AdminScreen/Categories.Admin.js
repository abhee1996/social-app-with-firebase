import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../../Component/FormContainer';
import InputField from '../../Component/InputField';
import AppPicker from '../../Component/AppPicker/AppPicker';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import colors from '../../config/colors';

const AdminCategories = () => {
  const [category, setCategory] = useState('');
  return (
    <View>
      <FormContainer title="Add Category">
        <View style={styles.ImageContainer}>
          <Text>Add Category</Text>
        </View>
        <InputField
          placeholder="caregory"
          name="category"
          id={'category'}
          value={category}
          islabel={true}
          label={'Category'}
          labelStyle={styles.label}
          onChangeText={text => setCategory(text)}
        />

        {/* <View>{error ? <Error message={error} /> : null}</View> */}
        <View style={styles.buttonContainer}>
          <AppIconButton
            title="Submit"
            leftIcon={true}
            //  onPress={() => props.navigation.navigate('AdminProductForm')}
            size={15}
            marginX="3.5%"
            marginY="7%"
            borderRadius={0}
            buttonBgColor={colors.successpro.success500}
            txtColor={colors.default.white}
          />
        </View>
      </FormContainer>
    </View>
  );
};

export default AdminCategories;

const styles = StyleSheet.create({});
