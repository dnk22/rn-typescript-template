import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 10,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  modalView: {
    flexDirection: 'column',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalAction: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
