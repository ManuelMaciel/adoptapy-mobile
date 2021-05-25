import React from 'react';
import PetForm from '../../../components/Form/PetForm';

const AdoptionCreateScreen = ({ route, navigation }) => {

  const { type  } = route.params;

  return (
    <PetForm navigation={navigation} type={type} />
  )
}

export default AdoptionCreateScreen