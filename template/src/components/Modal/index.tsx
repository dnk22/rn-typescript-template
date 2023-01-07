import React, { memo } from 'react';
import { StyleProp, TouchableOpacity, View } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { styles } from './styles';
import { useCustomTheme } from 'resources/theme';
import isEqual from 'react-fast-compare';
import SvgIcon from 'components/SvgIcon';

const defaultProps = {
  isVisible: false,
  isShowClose: true,
  animationInTiming: 400,
  animationOutTiming: 400,
  backdropColor: '#6e768142',
  animationIn: 'zoomIn',
  animationOut: 'zoomOut',
};

type NewAppProps = Partial<ModalProps>;

export interface IModalComponentProps extends NewAppProps {
  onToggleModal: () => void;
  isShowClose?: boolean;
  height?: string | number;
  styleDefaultContent?: StyleProp<any>;
}

const ModalComponent = ({
  isVisible,
  style,
  children,
  backdropColor,
  animationInTiming,
  animationOutTiming,
  animationIn,
  animationOut,
  isShowClose,
  height,
  styleDefaultContent,
  onBackdropPress,
  onToggleModal,
  ...rest
}: IModalComponentProps) => {
  const { colors } = useCustomTheme();

  const onHandleBackdropPress = () => {
    onBackdropPress && onBackdropPress();
    onToggleModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={backdropColor}
      style={[styles.modal, style]}
      onBackdropPress={onHandleBackdropPress}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      hideModalContentWhileAnimating={true}
      animationIn={animationIn}
      animationOut={animationOut}
      {...rest}
      useNativeDriver
    >
      <View
        style={[
          styles.modalView,
          { backgroundColor: colors.surface, height },
          styleDefaultContent,
        ]}
      >
        {isShowClose && (
          <TouchableOpacity style={styles.modalAction} onPress={onToggleModal}>
            <SvgIcon name="closeCircle" preset="closeModal" />
          </TouchableOpacity>
        )}
        {children}
      </View>
    </Modal>
  );
};

ModalComponent.defaultProps = defaultProps;
export default memo(ModalComponent, isEqual);
