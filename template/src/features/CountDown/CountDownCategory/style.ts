import { StyleSheet } from 'react-native';
import { normalize } from 'share/scale';

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemActive: {
    padding: 2,
    borderColor: '#787A91',
    borderWidth: 1,
    width: normalize(14),
    height: normalize(14),
    borderRadius: 30,
  },
  itemActiveBackground: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#E63E6D',
  },
  itemIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: normalize(16),
  },
});

export default styles;
