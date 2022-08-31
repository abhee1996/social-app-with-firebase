import {StyleSheet} from 'react-native';

function Margin(mTop, mRight, mBottom, mLeft) {
  let margining = (
    <Styles mTop={mTop} mRight={mRight} mBottom={mBottom} mLeft={mLeft} />
  );
  return margining;
}
const Styles = props => {
  console.log('props', props);
  const {mTop, mRight, mBottom, mLeft} = props;
  return StyleSheet.create({
    margining: {
      marginTop: mTop,
      marginRight: mRight,
      marginBottom: mBottom,
      marginLeft: mLeft,
    },
  });
};
export default Margin;
// marginTop: mTop,
// marginRight: mRight,
// marginBottom: mBottom,
// marginLeft: mLeft,
